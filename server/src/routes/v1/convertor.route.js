"use strict";

const express = require("express");
const {
  uploadDisk,
  uploadMemory,
} = require("../../middlewares/upload.middleware");
const convertorController = require("../../controllers/convertor.controller");
const asyncHandler = require("../../helper/asyncHandler");

const router = express.Router();

router.post(
  "/detectFile",
  uploadMemory.array("files", 15),
  asyncHandler(convertorController.detectFile),
);

router.post(
  "/convertFile",
  uploadMemory.single("file"),
  asyncHandler(convertorController.convertFileSingle),
);

router.post(
  "/convertToPdf",
  uploadMemory.single("file"),
  asyncHandler(convertorController.convertImageToPdf),
);

router.post(
  "/convertBatchFiles",
  uploadMemory.array("files", 5),
  asyncHandler(convertorController.convertBatchFiles),
);
module.exports = router;
