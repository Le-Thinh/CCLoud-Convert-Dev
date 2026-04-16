"use strict";

const { Worker } = require("bullmq");
const ConvertorService = require("../services/convertor.service");

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
  { connection },
);

conversionWorker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`);
});

conversionWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

module.exports = { conversionWorker };
