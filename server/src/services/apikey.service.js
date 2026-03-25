"use strict";

const { BadRequestError } = require("../core/error.response");
const apiKeyRepository = require("../models/repositories/apikey.repo");

class ApiKeyService {
  static newApiKey = async () => {
    const permissions = ["0000"];
    const newApiKey = await apiKeyRepository.createApiKey(permissions);

    if (!newApiKey) throw new BadRequestError("New ApiKey Not Found");

    console.log(newApiKey);
    return newApiKey;
  };
}

module.exports = ApiKeyService;
