"use strict";

import { request } from "./server.api";

const URL_BASE_CONVERT = "convertor";

export const convertToPdf = async (formData) => {
  const response = await request.post(
    `${URL_BASE_CONVERT}/convertToPdf`,
    formData,
  );

  return response;
};

export const detectFile = async (formData) => {
  const response = await request.post(
    `${URL_BASE_CONVERT}/detectFile`,
    formData,
  );
  return response;
};
