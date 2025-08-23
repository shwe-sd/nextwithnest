// jest.config.js
const nextJest = require('next/jest');

// Creating a function that wraps the Jest config with Next.js specific settings
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Set the test environment to a browser-like environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Map module aliases defined in tsconfig.json to Jest's module resolver
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
  },
};

// Export the combined Next.js and custom Jest configuration
module.exports = createJestConfig(customJestConfig);