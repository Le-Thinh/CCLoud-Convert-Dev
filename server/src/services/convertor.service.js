"use strict";

const fs = require("fs").promises;
const sharp = require("sharp");
const {
  CONVERSION_MATRIX,
  getConversionSuggestion,
  canConvert,
  PDF_EMBED_MAP,
} = require("../configs/format.config");
const {
  ALLOWED_MIME_TYPES,
  generateUniqueFilename,
} = require("../configs/multer.config");
const {
  SHARP_FORMAT_MAP,
  buildFormatOptions,
  buildSharpPipeline,
} = require("../configs/sharp.config");
const {
  NotFoundError,
  UnsupportedFormatError,
  BadRequestError,
} = require("../core/error.response");
const {
  validateFileExists,
  convertToObjectMongoId,
  fitDimensions,
  A4,
  buildFileName,
} = require("../utils");
const { fileTypeFromFile, fileTypeFromBuffer } = require("file-type");
const {
  uploadToS3,
  getUrlSignedFromCloudFront,
  getS3DownloadURL,
} = require("./upload.aws.service");
const path = require("path");
const { sanitizeFilename } = require("../helper");
const ConversionJobRepo = require("../models/repositories/conversion-job.model");

const { PDFDocument } = require("pdf-lib");

const isImage = (mime) => mime.startsWith("image/");
const isPdf = (mime) => mime === "application/pdf";
const isDoc = (mime) =>
  mime.startsWith("application/vnd") || mime === "application/msword";

class ConvertorService {
  /**
   * @param {string} file
   * @returns {Promise<Obj>}
   */
  static detectFileType = async (file) => {
    if (!file?.buffer) throw new NotFoundError("File buffer not found");

    const detected = await fileTypeFromBuffer(file.buffer);
    if (!detected) {
      if (!detected)
        throw new UnsupportedFormatError("Cannot detect file type");
    }

    const isSupported = ALLOWED_MIME_TYPES.includes(detected.mime);

    if (!isSupported) {
      throw new UnsupportedFormatError(detected.mime, ALLOWED_MIME_TYPES);
    }

    return {
      success: true,
      metadata: {
        mimeType: detected.mime,
        extension: detected.ext,
        size: detected.size,
        sizeFormatted: this.formatFileSize(file.size),
        detectedAt: new Date().toISOString(),
        suggestConvert: getConversionSuggestion(detected.mime) ?? null,
      },
    };
  };

  static formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  static convert = async ({ file, targetMime, opts = {}, userId = null }) => {
    //1. Validate
    if (!file?.buffer) throw new BadRequestError("file.buffer is required");
    if (!file?.originalname)
      throw new BadRequestError("file.originalname is required");
    if (!targetMime) throw new BadRequestError("targetMime is required");

    const detected = await fileTypeFromBuffer(file.buffer);
    if (!detected) throw new UnsupportedFormatError("Cannot detect file type");

    const sourceMime = detected.mime;

    if (!canConvert(sourceMime, targetMime))
      throw new UnsupportedFormatError(
        `Conversion not allowed: ${sourceMime} → ${targetMime}`,
      );

    if (isImage(sourceMime) && isPdf(targetMime)) {
      return await this.convertImageToPdf(file, opts, userId);
    }

    if (isImage(sourceMime) && isImage(targetMime)) {
      return await this.convertFileImage(file, targetMime, opts);
    }

    throw new UnsupportedFormatError(
      `No converter available: ${sourceMime} → ${targetMime}`,
    );
  };

  static convertFileImage = async (file, targetMime, opts = {}) => {
    //1. Validate
    if (!file?.buffer) throw new BadRequestError("file.buffer is required");
    if (!file?.originalname)
      throw new BadRequestError("file.originalname is required");
    if (!targetMime) throw new BadRequestError("targetMime is required");

    const detected = await fileTypeFromBuffer(file.buffer);

    if (!detected) throw new UnsupportedFormatError("Cannot detect file type");

    const sourceMime = detected.mime;

    if (!sourceMime.startsWith("image/"))
      throw new UnsupportedFormatError(`Source must be image: ${sourceMime}`);

    const targetConfig = SHARP_FORMAT_MAP[targetMime];

    if (!targetConfig)
      throw new UnsupportedFormatError(
        `Target format not supported: ${targetMime}`,
      );

    if (!canConvert(sourceMime, targetMime))
      throw new UnsupportedFormatError(
        `Conversion not allowed: ${sourceMime} → ${targetMime}`,
      );

    //2.Sharp Convert
    const sourceMeta = await sharp(file.buffer).metadata();
    const { method, options: defaultOptions } = targetConfig;

    //Merge Quality
    const formatOptions = buildFormatOptions(
      method,
      defaultOptions,
      opts.quality,
    );

    const outputBuffer = await buildSharpPipeline(sharp, file.buffer, opts)
      [method](formatOptions)
      .toBuffer();

    const convertedMeta = await sharp(outputBuffer).metadata();

    //3. Upload s3
    const fileNameOrigin = generateUniqueFilename(file.originalname);
    const ext = path.extname(fileNameOrigin);
    const baseName = path.basename(fileNameOrigin, ext);
    const fileNameConverted = `${baseName}.${targetConfig.method}`;
    const originalKey = `upload/${fileNameOrigin}`;
    const convertedKey = `converted/${fileNameConverted}`;
    const filenameDownload = buildFileName(
      file.originalname,
      targetConfig.method,
    );

    await Promise.all([
      uploadToS3({
        buffer: file.buffer,
        key: originalKey,
        mimeType: sourceMime,
        filename: fileNameOrigin,
      }),
      uploadToS3({
        buffer: outputBuffer,
        key: convertedKey,
        mimeType: targetMime,
        filename: fileNameConverted,
      }),
    ]);

    //4. Get Url Signed From CloudFront
    const convertedUrlPreview = getUrlSignedFromCloudFront(convertedKey);

    // Download → S3 presigned URL với attachment override
    const convertedUrlDownload = await getS3DownloadURL(
      convertedKey,
      filenameDownload,
    );

    const original = {
      key: originalKey,
      mimeType: sourceMime,
      size: file.buffer.length,
    };

    const converted = {
      key: convertedKey,
      mimeType: targetMime,
      size: outputBuffer.length,
    };

    //5. Save conversion job to DB
    const job = await ConversionJobRepo.createConversionJob({
      original: original,
      converted: converted,
      targetFormat: targetMime,
      status: "completed",
      options: opts,
    });

    if (!job) throw new Error("Failed to save conversion job to database");

    //Result
    const savedBytes = file.buffer.length - outputBuffer.length;
    return {
      success: true,
      metadata: {
        convertedUrlPreview,
        convertedUrlDownload,
        filenameDownload: filenameDownload,
        source: {
          key: originalKey,
          mime: sourceMime,
          size: file.buffer.length,
          sizeFormatted: this.formatFileSize(file.buffer.length),
          width: sourceMeta.width,
          height: sourceMeta.height,
          format: sourceMeta.format,
        },

        converted: {
          key: convertedKey,
          mime: targetMime,
          size: outputBuffer.length,
          sizeFormatted: this.formatFileSize(outputBuffer.length),
          width: convertedMeta.width,
          height: convertedMeta.height,
          format: convertedMeta.format,
        },

        stats: {
          savedBytes,
          savedFormatted: this.formatFileSize(Math.abs(savedBytes)),
          compressionRatio: `${savedBytes >= 0 ? "-" : "+"}${Math.abs(
            ((savedBytes / file.buffer.length) * 100).toFixed(1),
          )}%`,
        },

        convertedAt: new Date().toISOString(),
      },
    };
  };

  static convertFileImageBatch = async (files, targetMimes) => {
    //1. Validate
    if (!files || files.length === 0)
      throw new BadRequestError("No files provided");

    if (!targetMimes || targetMimes.length === 0)
      throw new BadRequestError("targetMimes is required");

    if (files.length !== targetMimes.length)
      throw new BadRequestError(
        `files count (${files.length}) must match targetMimes count (${targetMimes.length})`,
      );

    //2. Convert
    const convertSettled = await Promise.allSettled(
      files.map((file, idx) => this.convertFileImage(file, targetMimes[idx])),
    );

    const results = convertSettled.map((result, i) => {
      const filename = files[i].originalname;

      if (result.status === "fulfilled") {
        return {
          filename,
          success: true,
          targetMime: targetMimes[i],
          ...result.value.metadata,
        };
      }
      return {
        filename,
        success: false,
        targetMime: targetMimes[i],
        error: result.reason?.message ?? "Unknown error",
      };
    });

    const successCount = results.filter((r) => r.success).length;

    return {
      success: true,
      metadata: {
        total: files.length,
        successCount,
        failedCount: files.length - successCount,
        results,
      },
    };
  };

  static convertImageToPdf = async (file, opts = {}, userId = null) => {
    const { margin = 4, scaleUp = false, resize = null } = opts;

    //1. Validate
    if (!file?.buffer) throw new BadRequestError("file.buffer is required");
    if (!file?.originalname)
      throw new BadRequestError("file.originalname is required");

    const detected = await fileTypeFromBuffer(file.buffer);
    if (!detected) throw new UnsupportedFormatError("Cannot detect file type");

    const sourceMime = detected.mime;

    if (!sourceMime.startsWith("image/"))
      throw new UnsupportedFormatError(`Source must be image: ${sourceMime}`);

    if (!canConvert(sourceMime, "application/pdf"))
      throw new UnsupportedFormatError(
        `Conversion not allowed: ${sourceMime} → application/pdf`,
      );

    //2. Set up file before convert
    let embedBuffer = file.buffer;
    let embedMime = sourceMime;

    const embedMethod = PDF_EMBED_MAP[sourceMime];
    if (!embedMethod) {
      // Convert sang JPEG bằng Sharp trước khi nhúng vào PDF
      embedBuffer = await sharp(file.buffer)
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();
      embedMime = "image/jpeg";
    }

    const imgMeta = await sharp(file.buffer).metadata();

    //3. Convert Image To PDF
    const pdfDoc = await PDFDocument.create();
    const pageWidth = resize?.width ? parseInt(resize.width) : A4.width;
    const pageHeight = resize?.height ? parseInt(resize.height) : A4.height;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const finalEmbedMethod = PDF_EMBED_MAP[embedMime];
    const embeddedImage = await pdfDoc[finalEmbedMethod](embedBuffer);

    const {
      width: drawWidth,
      height: drawHeight,
      x,
      y,
    } = fitDimensions(
      imgMeta.width,
      imgMeta.height,
      margin,
      pageWidth,
      pageHeight,
    );

    page.drawImage(embeddedImage, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });

    // Xuất PDF ra buffer
    const pdfBuffer = Buffer.from(await pdfDoc.save());

    // ── 4. Upload S3 ───────────────────────────
    const fileName = generateUniqueFilename(file.originalname);
    const baseName = fileName.replace(/\.[^.]+$/, "");
    const originalKey = `upload/${fileName}`;
    const convertedFileName = `${baseName}.pdf`;
    const pdfKey = `converted/${baseName}.pdf`;

    const filenameDownload = buildFileName(file.originalname, "pdf");

    await Promise.all([
      uploadToS3({
        buffer: file.buffer,
        key: originalKey,
        mimeType: sourceMime,
        filename: fileName,
      }),
      uploadToS3({
        buffer: pdfBuffer,
        key: pdfKey,
        mimeType: "application/pdf",
        filename: convertedFileName,
      }),
    ]);

    // ── 5. CloudFront Signed URLs
    const convertedUrlPreview = getUrlSignedFromCloudFront(pdfKey);
    const convertedUrlDownload = await getS3DownloadURL(
      pdfKey,
      filenameDownload,
    );

    //6. Save conversion job to DB
    const original = {
      key: originalKey,
      mimeType: sourceMime,
      size: file.buffer.length,
    };

    const converted = {
      key: pdfKey,
      mimeType: "application/pdf",
      size: pdfBuffer.length,
    };

    const isGuest = userId === null ? true : false;

    //5. Save conversion job to DB
    const job = await ConversionJobRepo.createConversionJob({
      original: original,
      converted: converted,
      targetFormat: "application/pdf",
      status: "completed",
      options: opts,
      isGuest,
    });

    if (!job) throw new Error("Failed to save conversion job to database");

    //7. Result
    return {
      success: true,
      metadata: {
        convertedUrlPreview,
        convertedUrlDownload,
        filenameDownload: filenameDownload,
        source: {
          key: originalKey,
          mime: sourceMime,
          size: file.buffer.length,
          sizeFormatted: this.formatFileSize(file.buffer.length),
          width: imgMeta.width,
          height: imgMeta.height,
          format: imgMeta.format,
        },

        converted: {
          key: pdfKey,
          mime: "application/pdf",
          size: pdfBuffer.length,
          sizeFormatted: this.formatFileSize(pdfBuffer.length),
          pages: 1,
          pageSize: "A4",
        },

        convertedAt: new Date().toISOString(),
      },
    };
  };
}

module.exports = ConvertorService;
