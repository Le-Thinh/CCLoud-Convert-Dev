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

const FIT_MAP = {
  max: "inside",
  crop: "cover",
  scale: "fill",
  cover: "cover",
  contain: "contain",
  fill: "fill",
  inside: "inside",
  outside: "outside",
};

const mapPngQuality = (quality) => {
  Math.round(((100 - Math.min(100, Math.max(1, quality))) / 100) * 9);
};

const buildFormatOptions = (method, defaultOptions, quality) => {
  if (!quality) return defaultOptions;

  switch (method) {
    case "jpeg":
      return {
        ...defaultOptions,
        quality: Math.min(100, Math.max(1, quality)),
      };
    case "webp":
      return {
        ...defaultOptions,
        quality: Math.min(100, Math.max(1, quality)),
      };
    case "avif":
      return {
        ...defaultOptions,
        quality: Math.min(100, Math.max(1, quality)),
      };
    case "tiff":
      return {
        ...defaultOptions,
        quality: Math.min(100, Math.max(1, quality)),
      };
    case "png":
      return { ...defaultOptions, compressionLevel: mapPngQuality(quality) };
    default:
      return defaultOptions;
  }
};

const buildSharpPipeline = (sharp, buffer, opts = {}) => {
  const { resize = {}, rotate, flip, flop } = opts;

  let pipeline = sharp(buffer);

  // Strip
  if (resize.strip === true) {
    pipeline = pipeline.withMetadata(false);
  } else {
    pipeline = pipeline.withMetadata();
  }

  //Resize
  if (resize.width || resize.height) {
    const fitMode = FIT_MAP[resize.fit ?? "max"] ?? "inside";
    pipeline = pipeline.resize({
      width: resize.width ? parseInt(resize.width) : undefined,
      height: resize.height ? parseInt(resize.height) : undefined,
      fit: fitMode,
      withoutEnlargement: (resize.fit ?? "max") === "max",
    });
  }

  //Rotate
  if (rotate !== undefined && rotate !== 0) {
    pipeline = pipeline.rotate(parseInt(rotate));
  }

  //vertical
  if (flip === true) pipeline = pipeline.flip();

  //horizontal
  if (flop === true) pipeline = pipeline.flop();

  return pipeline;
};

module.exports = {
  SHARP_FORMAT_MAP,
  MIME_TO_EXT,
  buildFormatOptions,
  mapPngQuality,
  buildSharpPipeline,
};
