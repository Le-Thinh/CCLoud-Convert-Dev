"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "apikeys";

var apiKeySchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "1122"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = model(DOCUMENT_NAME, apiKeySchema);
