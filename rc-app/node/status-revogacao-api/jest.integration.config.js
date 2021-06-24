const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']
config.setupFilesAfterEnv = ['./src/teste/setup.ts'],

module.exports = config
