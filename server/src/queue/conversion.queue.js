"use strict";

const { Queue } = require("bullmq");

const connection = {
  url: process.env.REDIS_URL,
};

const conversionQueue = new Queue("conversion", { connection });

module.exports = { conversionQueue };
