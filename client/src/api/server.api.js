"use strict";

import axios from "axios";

const SERVER_URL = import.meta.env.DEV
  ? import.meta.env.VITE_SERVER_URL
  : import.meta.env.VITE_PROD_SERVER_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const request = axios.create({
  baseURL: SERVER_URL + "/v1/api",
  withCredentials: true,
  headers: {
    "x-api-key": API_KEY,
  },
});
