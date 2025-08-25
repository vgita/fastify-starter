export interface HealthStatus {
	status: string;
	timestamp: string;
	uptime: number;
	version: string;
}

export class HealthService {
	static getHealthStatus(): HealthStatus {
		return {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			version: process.env['npm_package_version'] || '1.0.0',
		};
	}
}
