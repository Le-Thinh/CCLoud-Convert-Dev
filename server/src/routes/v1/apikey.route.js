"use strict";

const express = require("express");
const asyncHandler = require("../../helper/asyncHandler");
const apikeyController = require("../../controllers/apikey.controller");

const router = express.Router();

router.post("/", asyncHandler(apikeyController.newApikey));

module.exports = router;
