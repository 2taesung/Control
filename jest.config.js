// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  // 테스트 제한시간
  testTimeout: 60000,
  // svg 모킹 컴포넌트 바인딩
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/src/mocks/svgMock.tsx',
    'styled-components':
      'styled-components/dist/styled-components.browser.cjs.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', 'test_util'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
