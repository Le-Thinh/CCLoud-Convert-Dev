"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "ConversionJob";
const COLLECTION_NAME = "conversion_jobs";

const conversionJobSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },

    // Original file info
    original_key: { type: String, required: true, unique: true },
    original_mimeType: { type: String },
    original_size: { type: Number },

    // Converted file info
    converted_key: { type: String, required: true, unique: true },
    converted_mimeType: { type: String },
    converted_size: { type: Number },

    target_format: { type: String, required: true },
    options: { type: Object, default: {} },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

module.exports = model(DOCUMENT_NAME, conversionJobSchema);
