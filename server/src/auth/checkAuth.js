"use strict";

const ApiKeyRepository = require("../models/repositories/apikey.repo");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "FORBIDDEN ERROR",
      });
    }

    const objKey = await ApiKeyRepository.findApiKeyByKey({ key });

    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.objKey = objKey;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      if (!req.objKey.permissions) {
        return res.status(403).json({
          message: "Forbidden Error",
        });
      }
    }

    return next();
  };
};

module.exports = {
  apiKey,
  permission,
};
