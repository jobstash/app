export default {
  displayName: 'shared-utils',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/shared/utils',
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    '@next/font/(.*)': require.resolve(
      'next/dist/build/jest/__mocks__/nextFontMock.js',
    ),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
