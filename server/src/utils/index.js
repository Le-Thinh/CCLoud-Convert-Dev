"use strict";

const fs = require("fs").promises;
const { Types } = require("mongoose");
const { NotFoundError } = require("../core/error.response");

const A4 = { width: 595.28, height: 841.89 }; // in points (1/72 inch)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const validateFileExists = async (filePath, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.stat(filePath);
      return true;
    } catch (err) {
      if (i === retries - 1) {
        throw new NotFoundError(`File does not exist: ${filePath}`);
      }
      await wait(50);
    }
  }
};

const fitDimensions = (imgWidth, imgHeight, margin = 40) => {
  const maxWidth = A4.width - margin * 2;
  const maxHeight = A4.height - margin * 2;

  const widthRatio = maxWidth / imgWidth;
  const heightRatio = maxHeight / imgHeight;

  const scale = Math.min(widthRatio, heightRatio, 1);

  const drawWidth = imgWidth * scale;
  const drawHeight = imgHeight * scale;

  const x = (A4.width - drawWidth) / 2;
  const y = (A4.height - drawHeight) / 2;

  return { width: drawWidth, height: drawHeight, x, y };
};

const convertToObjectMongoId = (id) => new Types.ObjectId(id);

module.exports = {
  validateFileExists,
  convertToObjectMongoId,
  A4,
  fitDimensions,
};
