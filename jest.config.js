// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./"
});

const customJestConfig = {
  testEnvironment: "<rootDir>/env.js",
  setupFilesAfterEnv: ["whatwg-fetch", "<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1"
  }
};

module.exports = createJestConfig(customJestConfig);
