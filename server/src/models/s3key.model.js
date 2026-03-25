"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "S3Key";
const COLLECTION_NAME = "s3keys";

const s3keySchema = new Schema(
  {
    bucket: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    region: { type: String, default: "ap-southeast-1" },
    size: { type: Number, default: 0 },
    mimeType: { type: String },
    storage: { type: String, default: "s3" },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = model(DOCUMENT_NAME, s3keySchema);
