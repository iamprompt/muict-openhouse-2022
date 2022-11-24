import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/test/__fixtures__', '<rootDir>/node_modules', '<rootDir>/dist'],
  preset: 'ts-jest',
  coverageReporters: ['json-summary', 'json', 'lcov', 'text', 'text-summary', 'clover'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  resetMocks: false,
  collectCoverage: true,
  coverageProvider: 'v8',
}

export default config
