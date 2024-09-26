/* eslint-disable */
export default {
  displayName: 'duality-social-node',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    '^@duality-social/duality-social-node-lib$':
      '<rootDir>/__mocks__/@duality-social/duality-social-node-lib.ts',
    '^@duality-social/duality-social-node-lib/(.*)$':
      '<rootDir>/__mocks__/@duality-social/duality-social-node-lib.ts',
  },
};
