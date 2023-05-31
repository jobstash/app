export default {
  displayName: 'jobs-data',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/jobs/data',
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    '@next/font/(.*)': require.resolve(
      'next/dist/build/jest/__mocks__/nextFontMock.js',
    ),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
