"use strict";

const { BadRequestError } = require("../../core/error.response");
const APIKEYMODEL = require("../apikey.model");
const crypto = require("crypto");

class ApiKeyRepository {
  static createApiKey = async (permissions = [""]) => {
    const randomKey = crypto.randomBytes(64).toString("hex");
    const newApiKey = await APIKEYMODEL.create({
      key: randomKey,
      permissions,
    });

    if (!newApiKey) throw new BadRequestError("ApiKey Not Found");

    return newApiKey;
  };

  static findApiKeyByKey = async ({ key }) => {
    const foundApiKey = await APIKEYMODEL.findOne({ key, status: true }).lean();

    return foundApiKey;
  };
}

module.exports = ApiKeyRepository;
