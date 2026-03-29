"use strict";

const {
  generateUniqueFilename,
  ALLOWED_MIME_TYPES,
} = require("../configs/multer.config");
const {
  PutObjectCommand,
  s3,
  GetObjectCommand,
} = require("../configs/s3.aws.config");
const {
  NotFoundError,
  BadRequestError,
  UnsupportedFormatError,
} = require("../core/error.response");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const S3KeyRepository = require("../models/repositories/s3key.repo");
const { getConversionSuggestion } = require("../configs/format.config");

class UploadService {
  /**
   *
   * @param {Object} file
   * @return {Object}
   */
  static uploadFileFromLocalS3 = async ({ file, folder = "upload" }) => {
    if (!file) {
      throw new NotFoundError("File is required");
    }

    if (!file.originalname) {
      throw new NotFoundError("File originalname is missing");
    }

    if (!file.buffer) {
      throw new NotFoundError("File buffer is missing");
    }

    const nameFile = generateUniqueFilename(file);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${nameFile}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const result = await s3.send(command);

    const s3Key = await S3KeyRepository.createS3Key({
      bucket: process.env.AWS_BUCKET_NAME,
      key: `${folder}/${nameFile}`,
      size: file.size,
      mimeType: file.mimetype,
    });

    if (!s3Key) {
      throw new BadRequestError("S3Key not found");
    }

    // const signedUrl = new GetObjectCommand({
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: `${folder}/${nameFile}`,
    // });

    // const url = await getSignedUrl(s3, signedUrl, {
    //   expiresIn: 3000,
    // });

    const url = getSignedUrl({
      url: `${process.env.AWS_BUCKET_CLOUDFRONT_URL}/${folder}/${nameFile}`,
      keyPairId: process.env.AWS_BUCKET_CLOUDFRONT_KEY_PAIR_ID,
      privateKey: process.env.AWS_BUCKET_CLOUDFRONT_PRIVATE_KEY,
      dateLessThan: new Date(Date.now() + 2 * 60 * 60 * 1000), //2 hours
    });

    // Get Suggest Convert File
    const isSupported = ALLOWED_MIME_TYPES.includes(file.mimetype);

    if (!isSupported)
      throw new UnsupportedFormatError(`${file.mimeType} is not support`);

    const getSuggests = getConversionSuggestion(file.mimetype);

    if (!getSuggests) throw new NotFoundError("Conversion Suggest Not Found");

    return {
      success: true,
      metadata: {
        url,
        result: result,
        suggestConvert: getSuggests,
      },
    };
  };

  static uploadToS3 = async ({
    buffer,
    key,
    mimeType,
    filename,
    disposition = "inline",
  }) => {
    if (!buffer || !key || !mimeType) {
      throw new NotFoundError("Missing required parameters");
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key, //`${folder}/${nameFile}`
      Body: buffer,
      ContentType: mimeType,
      ContentDisposition: `${disposition}; filename="${filename}"`,
    });

    await s3.send(command);
    return key;
  };

  static getUrlSignedFromCloudFront = (key, disposition = "inline") => {
    const url = getSignedUrl({
      url: `${process.env.AWS_BUCKET_CLOUDFRONT_URL}/${key}`,
      keyPairId: process.env.AWS_BUCKET_CLOUDFRONT_KEY_PAIR_ID,
      privateKey: process.env.AWS_BUCKET_CLOUDFRONT_PRIVATE_KEY,
      dateLessThan: new Date(Date.now() + 2 * 60 * 60 * 1000), //2 hours
    });
    return url;
  };
}

module.exports = UploadService;
