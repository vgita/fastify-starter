import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HealthService } from '../health.service.js';

const mockTime = new Date('2025-01-01T00:00:00.000Z');

describe('HealthService', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(mockTime);

		vi.spyOn(process, 'uptime').mockReturnValue(123.456);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	describe('getHealthStatus', () => {
		it('should return health status with correct structure', () => {
			const result = HealthService.getHealthStatus();

			expect(result).toEqual({
				status: 'healthy',
				timestamp: mockTime.toISOString(),
				uptime: 123.456,
				version: expect.any(String),
			});
		});

		it('should return status as "healthy"', () => {
			const result = HealthService.getHealthStatus();

			expect(result.status).toBe('healthy');
		});

		it('should return current timestamp in ISO format', () => {
			const result = HealthService.getHealthStatus();

			expect(result.timestamp).toBe(mockTime.toISOString());
			expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
		});

		it('should return process uptime', () => {
			const result = HealthService.getHealthStatus();

			expect(result.uptime).toBe(123.456);
			expect(typeof result.uptime).toBe('number');
		});

		it('should return version from npm_package_version environment variable', () => {
			const originalVersion = process.env['npm_package_version'];
			process.env['npm_package_version'] = '2.1.0';

			const result = HealthService.getHealthStatus();

			expect(result.version).toBe('2.1.0');

			if (originalVersion) {
				process.env['npm_package_version'] = originalVersion;
			} else {
				delete process.env['npm_package_version'];
			}
		});

		it('should return default version "1.0.0" when npm_package_version is not set', () => {
			const originalVersion = process.env['npm_package_version'];
			delete process.env['npm_package_version'];

			const result = HealthService.getHealthStatus();

			expect(result.version).toBe('1.0.0');

			if (originalVersion) {
				process.env['npm_package_version'] = originalVersion;
			}
		});

		it('should return different timestamps on subsequent calls', () => {
			vi.useRealTimers(); // Use real timers for this test

			const result1 = HealthService.getHealthStatus();

			setTimeout(() => {
				const result2 = HealthService.getHealthStatus();
				expect(result1.timestamp).not.toBe(result2.timestamp);
			}, 10);
		});

		it('should return all required properties', () => {
			const result = HealthService.getHealthStatus();
			const requiredProperties = ['status', 'timestamp', 'uptime', 'version'];

			requiredProperties.forEach((property) => {
				expect(result).toHaveProperty(property);
				expect(result[property as keyof typeof result]).toBeDefined();
			});
		});

		it('should return consistent data types', () => {
			const result = HealthService.getHealthStatus();

			expect(typeof result.status).toBe('string');
			expect(typeof result.timestamp).toBe('string');
			expect(typeof result.uptime).toBe('number');
			expect(typeof result.version).toBe('string');
		});
	});
});
