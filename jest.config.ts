import type { Config } from "jest";

const config: Config = {
    "preset": "ts-jest",
    testEnvironment: "node",
    testRegex: "/tests",
    modulePathIgnorePatterns: ["<rootDir>/out/"],
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    verbose: true,
}

export default config;