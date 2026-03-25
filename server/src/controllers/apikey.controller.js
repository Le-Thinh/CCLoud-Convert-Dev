"use strict";

const { SuccessResponse } = require("../core/success.response");
const ApiKeyService = require("../services/apikey.service");

class ApiKeyController {
  newApikey = async (req, res, next) => {
    new SuccessResponse({
      message: "Create New Apikey Success!",
      metadata: await ApiKeyService.newApiKey(req.body),
    }).send(res);
  };
}

module.exports = new ApiKeyController();
