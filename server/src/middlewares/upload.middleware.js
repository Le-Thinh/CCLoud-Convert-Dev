"use strict";

const multer = require("multer");
const {
  diskStorageConfig,
  limitsConfig,
  fileFilterConfig,
} = require("../configs/multer.config");

// Memory storage
const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: limitsConfig,
  fileFilter: fileFilterConfig,
});

// Disk storage
const uploadDisk = multer({
  storage: multer.diskStorage(diskStorageConfig),
  limits: limitsConfig,
  fileFilter: fileFilterConfig,
});

module.exports = {
  uploadMemory,
  uploadDisk,
};
