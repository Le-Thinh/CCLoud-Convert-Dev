"use strict";

const SHARP_FORMAT_MAP = {
  "image/jpeg": {
    method: "jpeg",
    options: { quality: 85, mozjpeg: true, progressive: true },
  },
  "image/jpg": {
    method: "jpeg",
    options: { quality: 85, mozjpeg: true, progressive: true },
  },
  "image/png": {
    method: "png",
    options: { compressionLevel: 9, progressive: true },
  },
  "image/webp": { method: "webp", options: { quality: 80, effort: 4 } },
  "image/gif": { method: "gif", options: { effort: 7 } },
  "image/tiff": {
    method: "tiff",
    options: { quality: 90, compression: "lzw" },
  },
  "image/avif": { method: "avif", options: { quality: 60, effort: 5 } },
};

const MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/tiff": "tiff",
  "image/avif": "avif",
};

module.exports = {
  SHARP_FORMAT_MAP,
  MIME_TO_EXT,
};
