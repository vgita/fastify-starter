import type { FastifyInstance } from 'fastify';

import { HealthService } from './health.service.js';
import { healthResponseSchema } from './health.schema.js';

const tags = ['health'];

export default async function healthRoutes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.get(
		'/health',
		{
			schema: {
				tags: tags,
				summary: 'Health check endpoint',
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
				summary: 'Readiness check endpoint',
				response: {
					200: healthResponseSchema,
				},
			},
		},
		async () => HealthService.getHealthStatus(),
	);
}
