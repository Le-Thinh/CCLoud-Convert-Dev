"use strict";

const path = require("path");

const sanitizeFilename = (fileName) => {
  const coreName = path.basename(fileName);

  return coreName
    .replace(/[^a-zA-Z0-9.-_]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
};

module.exports = {
  sanitizeFilename,
};
