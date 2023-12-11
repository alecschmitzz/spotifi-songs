// jest.config.mjs
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts'],
  // setupFilesAfterEnv: ['<rootDir>/src/data-access/singleton.ts'],
};
