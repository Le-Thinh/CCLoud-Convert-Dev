"use strict";

const express = require("express");
const {
  uploadDisk,
  uploadMemory,
} = require("../../middlewares/upload.middleware");
const asyncHandler = require("../../helper/asyncHandler");
const uploadController = require("../../controllers/upload.controller");

const router = express.Router();

router.post(
  "/bucket",
  uploadMemory.array("files", 20),
  asyncHandler(uploadController.uploadFileFromS3),
);

module.exports = router;
