"use strict";

const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");
const { METHOD_FAILURE } = require("../utils/statusCodes");

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.now = Date.now();
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST,
    value
  ) {
    super(message, statusCode, value);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NotFoundError,
    statusCode = StatusCodes.NotFoundError
  ) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class UnsupportedFormatError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNSUPPORTED_MEDIA_TYPE,
    statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    format,
    allowedFormats = []
  ) {
    super(message, statusCode, format, allowedFormats);
  }
}

module.exports = {
  ErrorResponse,
  BadRequestError,
  AuthFailureError,
  NotFoundError,
  ForbiddenError,
  UnsupportedFormatError,
};
