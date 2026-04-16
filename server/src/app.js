"use strict";

require("dotenv").config();
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ccloud-convert-dev.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(compression());

//init bullmq worker
require("./queue/conversion.worker.js");

//Init DB
require("./db/init.mongodb");

// init route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "1",
  });
});

app.use("/", require("./routes"));

// handle error
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
