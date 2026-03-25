"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");

const router = express.Router();

router.use(apiKey);
router.use(permission("0000"));

router.use("/v1/api/convertor", require("./v1/convertor.route"));
router.use("/v1/api/apikey", require("./v1/apikey.route"));
router.use("/v1/api/upload", require("./v1/upload.route"));

module.exports = router;
