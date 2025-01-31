/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx}"],
	collectDirectory: ["coverage"],
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
	transform: {
	  '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx', "ts", "tsx"],
	moduleNameMapper: {
	  '^.+\\.svg$': 'jest-svg-transformer',
	  '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
};