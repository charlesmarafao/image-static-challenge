// https://jestjs.io/docs/en/configuration.html
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');
process.env.TZ = 'UTC';

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*ts',
    '<rootDir>/src/shared/**/*ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
