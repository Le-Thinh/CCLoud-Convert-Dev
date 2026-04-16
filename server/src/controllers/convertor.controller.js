"use strict";

const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const { conversionQueue } = require("../queue/conversion.queue");
const convertorService = require("../services/convertor.service");

class ConvertorController {
  detectFile = async (req, res, next) => {
    const { file } = req;
    if (!file || file.length === 0) {
      throw new BadRequestError(
        'No files uploaded. Send files with field name "files"',
      );
    }

    const detection = await convertorService.detectFileType(file);
    if (!detection) throw new BadRequestError("Detected File Failure!!");

    new SuccessResponse({
      message: `Detected successfully`,
      metadata: detection.metadata,
    }).send(res);
  };

  convertFile = async (req, res, next) => {
    const { file } = req;
    const { targetMime, opts: optsRaw } = req.body;

    if (!file || file.length) {
      throw new BadRequestError("File missing");
    }

    if (!targetMime) {
      throw new BadRequestError("Target missing");
    }

    let opts = {};
    if (optsRaw) {
      try {
        opts = JSON.parse(optsRaw);
      } catch {
        throw new BadRequestError(
          'opts must be valid JSON. Example: {"quality":80,"flip":true}',
        );
      }
    }

    const job = await conversionQueue.add("convert", {
      file: {
        ...file,
        buffer: Array.from(file.buffer),
      },
      targetMime,
      opts,
    });

    new SuccessResponse({
      message: "Job queued",
      metadata: { jobId: job.id },
    }).send(res);
  };

  // ENDPOINTS CONVERT
  getStatusJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await conversionQueue.getJob(jobId);

    const state = await job.getState();
    if (state === "completed") {
      return new SuccessResponse({
        message: "Job completed",
        metadata: {
          state,
          result: job.returnvalue,
        },
      }).send(res);
    }

    if (state === "failed") {
      return new SuccessResponse({
        message: "Job failed",
        metadata: {
          state,
          error: job.failedReason,
        },
      }).send(res);
    }

    new SuccessResponse({
      message: "Job in progress",
      metadata: { state },
    }).send(res);
  };

  convertFileSingle = async (req, res, next) => {
    const { file } = req;
    const { targetMime } = req.body;
    if (!file) {
      throw new BadRequestError("File Missing");
    }

    const result = await convertorService.convertFileImage(file, targetMime);

    new SuccessResponse({
      message: "File converted successfully",
      metadata: result.metadata,
    }).send(res);
  };

  convertBatchFiles = async (req, res, next) => {
    const files = req.files;
    const { targetMimes: targetMimesRaw } = req.body;

    if (!files)
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
