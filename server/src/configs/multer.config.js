"use strict";

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { sanitizeFilename } = require("../helper");
const { BadRequestError } = require("../core/error.response");

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.resolve(process.cwd(), "src/files", "uploads");

const CONVERTED_DIR =
  process.env.CONVERTED_DIR ||
  path.resolve(process.cwd(), "src/files", "converted");

const TEMP_DIR =
  process.env.TEMP_DIR || path.resolve(process.cwd(), "src/files", "temp");

// Ensure dir exist!
[UPLOAD_DIR, CONVERTED_DIR, TEMP_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Set Limit File
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 100 * 1024 * 1024;

// Allowed mine types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/avif",
  "image/svg+xml",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
];

/**
 * @param {oriName (original Name)} string
 * @return {string}
 */
const generateUniqueFilename = (payload) => {
  let oriName;

  if (typeof payload === "string") {
    oriName = payload;
  } else if (payload && typeof payload === "object" && payload.originalname) {
    oriName = payload.originalname;
  } else {
    throw new BadRequestError(
      "Invalid input: expected filename string or file object with originalname",
    );
  }

  const sanitized = sanitizeFilename(oriName);
  const ext = path.extname(sanitized);
  const nameWithoutExt = path.basename(sanitized, ext);
  const randomHash = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();

  return `${timestamp}-${randomHash}-${nameWithoutExt}${ext}`;
};

// Disk storage configuration
const diskStorageConfig = {
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = generateUniqueFilename(file.originalname);
    cb(null, uniqueName);
  },
};

/**
 *
 * @param {*obj} req
 * @param {*} file
 * @param {* fn (callback)} cb
 * @return {Boolean}
 */
const fileFilterConfig = (req, file, cb) => {
  // const allowedPrefixes = [
  //   "image/",
  //   "application/pdf",
  //   "application/vnd.openxmlformats",
  //   "text/",
  // ];

  // const isAllowed = allowedPrefixes.some((prefix) =>
  //   file.mimetype.startsWith(prefix)
  // );

  // if (isAllowed) {
  //   cb(null, true);
  // } else {
  //   cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  // }

  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  }
};

// Limits configuration
const limitsConfig = {
  fileSize: MAX_FILE_SIZE,
  files: 20,
  fields: 5,
};

module.exports = {
  UPLOAD_DIR,
  CONVERTED_DIR,
  TEMP_DIR,
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
  generateUniqueFilename,
  diskStorageConfig,
  fileFilterConfig,
  limitsConfig,
};
