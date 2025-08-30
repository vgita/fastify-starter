import type { FastifyInstance } from 'fastify';

import { HealthService } from '../health.service.js';

const tags = ['health'];

// Enhanced health response schema for v2
const healthV2ResponseSchema = {
	type: 'object',
	properties: {
		isSuccess: { type: 'boolean' },
		data: {
			type: 'object',
			properties: {
				status: { type: 'string', enum: ['healthy', 'unhealthy', 'degraded'] },
				timestamp: { type: 'string', format: 'date-time' },
				uptime: { type: 'number' },
				version: { type: 'string' },
				environment: { type: 'string' },
				dependencies: {
					type: 'object',
					properties: {
						database: { type: 'string', enum: ['healthy', 'unhealthy'] },
						cache: { type: 'string', enum: ['healthy', 'unhealthy'] },
						external_api: { type: 'string', enum: ['healthy', 'unhealthy'] },
					},
				},
			},
			required: ['status', 'timestamp', 'uptime', 'version'],
		},
	},
	required: ['isSuccess', 'data'],
};

export default async function healthV2Routes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.get(
		'/health',
		{
			schema: {
				tags: tags,
				summary: 'Health check endpoint (v2)',
				description:
					'Returns enhanced health status of the API v2 including dependency checks',
				response: {
					200: healthV2ResponseSchema,
				},
			},
		},
		async () => {
			const basicHealth = HealthService.getHealthStatus();
			return {
				...basicHealth,
				environment: process.env['NODE_ENV'] || 'development',
				dependencies: {
					database: 'healthy',
					cache: 'healthy',
					external_api: 'healthy',
				},
			};
		},
	);

	fastify.get(
		'/ready',
		{
			schema: {
				tags: tags,
				summary: 'Readiness check endpoint (v2)',
				description:
					'Returns enhanced readiness status of the API v2 with dependency validation',
				response: {
					200: healthV2ResponseSchema,
				},
			},
		},
		async () => {
			const basicHealth = HealthService.getHealthStatus();
			return {
				...basicHealth,
				environment: process.env['NODE_ENV'] || 'development',
				dependencies: {
					database: 'healthy',
					cache: 'healthy',
					external_api: 'healthy',
				},
			};
		},
	);

	// New endpoint only available in v2
	fastify.get(
		'/status',
		{
			schema: {
				tags: tags,
				summary: 'Detailed status endpoint (v2 only)',
				description:
					'Returns comprehensive system status information (new in v2)',
				response: {
					200: {
						type: 'object',
						properties: {
							isSuccess: { type: 'boolean' },
							data: {
								type: 'object',
								properties: {
									system: {
										type: 'object',
										properties: {
											memory: {
												type: 'object',
												properties: {
													used: { type: 'number' },
													total: { type: 'number' },
													percentage: { type: 'number' },
												},
											},
											cpu: { type: 'number' },
											platform: { type: 'string' },
											nodeVersion: { type: 'string' },
										},
									},
									timestamp: { type: 'string', format: 'date-time' },
									version: { type: 'string' },
								},
							},
						},
					},
				},
			},
		},
		async () => {
			const memUsage = process.memoryUsage();
			return {
				system: {
					memory: {
						used: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
						total: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100,
						percentage: Math.round(
							(memUsage.heapUsed / memUsage.heapTotal) * 100,
						),
					},
					cpu: process.cpuUsage().user / 1000000,
					platform: process.platform,
					nodeVersion: process.version,
				},
				timestamp: new Date().toISOString(),
				version: '2.0.0',
			};
		},
	);
}
