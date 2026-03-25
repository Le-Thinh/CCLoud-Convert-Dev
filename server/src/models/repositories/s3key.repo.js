"use strict";

const S3KEYMODEL = require("../s3key.model");

class S3KeyRepository {
  static createS3Key = async ({ bucket, key, size, mimeType }) => {
    const s3Key = await S3KEYMODEL.create({
      bucket: bucket,
      key: key,
      size: size,
      mimeType: mimeType,
    });

    return s3Key;
  };
}

module.exports = S3KeyRepository;
