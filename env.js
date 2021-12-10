/* eslint-disable @typescript-eslint/no-var-requires */

const Environment = require("jest-environment-jsdom");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongo = new MongoMemoryServer();

module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    if (typeof this.global.TextEncoder === "undefined") {
      const { TextEncoder, TextDecoder } = require("util");
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }

    await mongo.start();
    await super.setup();

    this.global.__MONGO_URI__ = mongo.getUri();
  }

  async teardown() {
    await mongo.stop();
    await super.teardown();
  }
};
