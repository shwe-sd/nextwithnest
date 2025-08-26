// jest.config.js
const nextJest = require('next/jest');

// Creating a function that wraps the Jest config with Next.js specific settings
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
  },

  // Ignore VS Code folders and any other irrelevant paths
  modulePathIgnorePatterns: [
    '/Downloads/Visual Studio Code',
    '/node_modules/',
    '/.next/',
  ],
};

// Export the combined Next.js and custom Jest configuration
module.exports = createJestConfig(customJestConfig);