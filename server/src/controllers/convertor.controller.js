"use strict";

const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const convertorService = require("../services/convertor.service");

class ConvertorController {
  detectFile = async (req, res, next) => {
    const { files } = req;
    if (!files || files.length === 0) {
      throw new BadRequestError(
        'No files uploaded. Send files with field name "files"',
      );
    }

    const results = await Promise.all(
      files.map(async (file) => {
        try {
          const detection = await convertorService.detectFileType(file);
          return {
            filename: file.originalname,
            success: true,
            ...detection.metadata,
          };
        } catch (error) {
          return {
            filename: file.originalname,
            success: false,
            error: error.message,
          };
        }
      }),
    );

    const successCount = results.filter((r) => r.success).length;
    const failedCount = files.length - successCount;

    new SuccessResponse({
      message: `Detected ${successCount}/${files.length} file(s) successfully`,
      metadata: {
        total: files.length,
        success: successCount,
        failed: failedCount,
        files: results,
      },
    }).send(res);
  };

  convertFileSingle = async (req, res, next) => {
    const { file } = req;
    const { targetMime } = req.body;
    if (!file) {
      throw new BadRequestError("File Missing");
    }

    new SuccessResponse({
      message: "File converted successfully",
      metadata: await convertorService.convertFileImage(file, targetMime),
    }).send(res);
  };

  convertBatchFiles = async (req, res, next) => {
    const files = req.files;
    const { targetMimes: targetMimesRaw } = req.body;

    if (!files || files.length === 0)
      throw new BadRequestError(
        'No files uploaded. Send files with field name "files"',
      );

    if (!targetMimesRaw) throw new BadRequestError("targetMimes is required");

    let targetMimes;
    try {
      targetMimes = JSON.parse(targetMimesRaw);
    } catch {
      throw new BadRequestError("targetMimes must be valid JSON array");
    }

    if (!Array.isArray(targetMimes))
      throw new BadRequestError("targetMimes must be an array");

    new SuccessResponse({
      message: `Converted`,
      metadata: await convertorService.convertFileImageBatch(
        files,
        targetMimes,
      ),
    }).send(res);
  };

  convertImageToPdf = async (req, res, next) => {
    const { file } = req;
    if (!file) {
      throw new BadRequestError("File Missing");
    }

    new SuccessResponse({
      message: "File converted successfully",
      metadata: await convertorService.convertImageToPdf(file),
    }).send(res);
  };
}

module.exports = new ConvertorController();
