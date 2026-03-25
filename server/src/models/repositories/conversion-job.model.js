"use strict";

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
  }) => {
    const conversionJob = await ConversionJobModel.create({
      userId,
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
}

module.exports = ConversionJobRepo;
