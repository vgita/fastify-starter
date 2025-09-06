import { HealthResponse } from './health.types.js';

export class HealthService {
	static getHealthStatus(): HealthResponse {
		return {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			version: process.env['npm_package_version'] || '1.0.0',
		};
	}
}
