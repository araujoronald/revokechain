module.exports = {
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' },
  bail: false,
  clearMocks: true,
  testMatch: ['<rootDir>/**/*.test.ts'],
  verbose: true,
};
