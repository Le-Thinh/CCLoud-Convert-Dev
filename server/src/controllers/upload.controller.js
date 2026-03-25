"use strict";

const { SuccessResponse } = require("../core/success.response");
const UploadService = require("../services/upload.aws.service");

class UploadController {
  uploadFileFromS3 = async (req, res, next) => {
    const { files } = req;
    if (!files) throw new BadRequestError("File missing");

    const results = await Promise.all(
      files.map(async (file) => {
        const detection = await UploadService.uploadFileFromLocalS3({
          file,
          folder: "upload",
        });

        return {
          ...detection.metadata,
        };
      }),
    );

    new SuccessResponse({
      message: "Success",
      metadata: results,
    }).send(res);
  };
}

module.exports = new UploadController();
