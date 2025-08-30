import type { FastifyInstance } from 'fastify';

import { HealthService } from '../health.service.js';
import { healthResponseSchema } from '../health.schema.js';

const tags = ['health'];

export default async function healthV1Routes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.get(
		'/health',
		{
			schema: {
				tags: tags,
				summary: 'Health check endpoint (v1)',
				description: 'Returns the health status of the API v1',
				response: {
					200: healthResponseSchema,
				},
			},
		},
		async () => HealthService.getHealthStatus(),
	);

	fastify.get(
		'/ready',
		{
			schema: {
				tags: tags,
				summary: 'Readiness check endpoint (v1)',
				description: 'Returns the readiness status of the API v1',
				response: {
					200: healthResponseSchema,
				},
			},
		},
		async () => HealthService.getHealthStatus(),
	);
}
