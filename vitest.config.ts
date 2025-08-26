import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		setupFiles: ['./tests/setup.ts'],
		// Test result reporters
		reporters: ['verbose', 'json', 'html', 'junit'],
		outputFile: {
			json: './test-results/results.json',
			html: './test-results/index.html',
			junit: './test-results/junit.xml',
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov', 'text-summary'],
			reportsDirectory: './coverage',
			exclude: [
				'node_modules/',
				'dist/',
				'tests/',
				'test-results/',
				'coverage/',
				'**/*.d.ts',
				'**/*.test.ts',
				'**/*.spec.ts',
				'vitest.config.ts',
				'eslint.config.js',
			],
			// Coverage thresholds
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80,
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': new URL('./src', import.meta.url).pathname,
		},
	},
	esbuild: {
		target: 'node18',
	},
});
