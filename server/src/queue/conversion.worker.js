"use strict";

const { Worker } = require("bullmq");
const ConvertorService = require("../services/convertor.service");
const ConversionJobRepo = require("../models/repositories/conversion-job.model");

const connection = {
  url: process.env.REDIS_URL,
};

const conversionWorker = new Worker(
  "conversion",
  async (job) => {
    const { file, targetMime, opts } = job.data;

    const restoredFile = {
      ...file,
      buffer: Buffer.from(file.buffer),
    };

    const result = await ConvertorService.convert({
      file: restoredFile,
      targetMime,
      opts,
    });

    return result;
  },
  {
    connection,
    // stalledInterval: 60000,
  },
);

conversionWorker.on("completed", async (job, result) => {
  await ConversionJobRepo.completeJob({
    jobId: job.id,
    original: {
      key: result.metadata.source.key,
      mimeType: result.metadata.source.mime,
      size: result.metadata.source.size,
    },
    converted: {
      key: result.metadata.converted.key,
      mimeType: result.metadata.converted.mime,
      size: result.metadata.converted.size,
    },
    options: result.metadata.options ?? {},
    result: result.metadata,
  });
});

conversionWorker.on("failed", async (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
  await ConversionJobRepo.failureJob({
    jobId: job.id,
    errorReason: err.message,
  });
});

module.exports = { conversionWorker };
