"use strict";

const mongoose = require("mongoose");

const connectString = `${process.env.MONGODB_URL_CONNECT}/convertfile`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (!connectString) {
      console.error("ConnectString error", connectString);
    }

    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", {
        color: true,
      });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 30,
      })
      .then((_) => {
        console.log("Connect DB Success");
      })
      .catch((err) => {
        console.log("Connect DB Failure", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

module.exports = instanceDatabase;
