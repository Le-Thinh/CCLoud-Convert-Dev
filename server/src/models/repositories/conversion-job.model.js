"use strict";

const conversionJobModel = require("../conversion-job.model");
const ConversionJobModel = require("../conversion-job.model");

class ConversionJobRepo {
  static createConversionJob = async ({
    userId,
    original,
    converted,
    targetFormat,
    status,
    options,
    isGuest = false,
    jobId = null,
  }) => {
    const conversionJob = await ConversionJobModel.create({
      userId,
      jobId,
      original_key: original.key,
      original_mimeType: original.mimeType,
      original_size: original.size,
      converted_key: converted.key,
      converted_mimeType: converted.mimeType,
      converted_size: converted.size,
      target_format: targetFormat,
      status,
      options,
      isGuest,
    });

    return conversionJob;
  };

  //Pending Job
  static createPendingJob = async ({ jobId, targetFormat, isGuest = true }) => {
    const conversionJob = await ConversionJobModel.create({
      jobId,
      target_format: targetFormat,
      status: "pending",
      isGuest,
      original_key: `pending-${jobId}`,
      converted_key: `pending-converted-${jobId}`,
    });

    return conversionJob;
  };

  //Worker call -> complete
  static completeJob = async ({
    jobId,
    original,
    converted,
    options,
    result,
  }) => {
    const updateData = await conversionJobModel.findOneAndUpdate(
      { jobId },
      {
        status: "completed",
        original_key: original.key,
        original_mimeType: original.mimeType,
        original_size: original.size,
        converted_key: converted.key,
        converted_mimeType: converted.mimeType,
        converted_size: converted.size,
        options,
        result,
      },
    );

    if (!updateData) throw new Error("ConversionJob Update Failed");

    return 1;
  };

  static failureJob = async ({ jobId, errorReason }) => {
    return await ConversionJobModel.findOneAndUpdate(
      { jobId },
      { status: "failed", errorReason },
      { new: true },
    );
  };

  static getJobStatus = async (jobId) => {
    return await ConversionJobModel.findOne(
      { jobId },
      { status: 1, errorReason: 1, result: 1 },
    );
  };
}

module.exports = ConversionJobRepo;
