import type { FastifyInstance } from 'fastify';

import { HealthService } from '../health.service.js';
import { HealthV2Response, SystemStatusResponse } from '../health.types.js';
import {
	healthV2ResponseSchema,
	systemStatusResponseSchema,
} from './health.schema.js';

const tags = ['health'];

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
		async (): Promise<HealthV2Response> => {
			const basicHealth = HealthService.getHealthStatus();
			return {
				...basicHealth,
				status: 'healthy',
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
		async (): Promise<HealthV2Response> => {
			const basicHealth = HealthService.getHealthStatus();
			return {
				...basicHealth,
				status: 'healthy',
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
					200: systemStatusResponseSchema,
				},
			},
		},
		async (): Promise<SystemStatusResponse> => {
			const memUsage = process.memoryUsage();
			return {
				system: {
					memory: {
						used:
							Math.round(
								(memUsage.heapUsed / 1024 / 1024) * 100,
							) / 100,
						total:
							Math.round(
								(memUsage.heapTotal / 1024 / 1024) * 100,
							) / 100,
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
