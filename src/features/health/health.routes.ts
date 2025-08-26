import type { FastifyInstance } from 'fastify';

import { HealthService } from './health.service.js';
import { healthResponseSchema } from './health.schema.js';

export default async function healthRoutes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.addSchema(healthResponseSchema);

	fastify.get(
		'/health',
		{
			schema: {
				tags: ['health'],
				summary: 'Health check endpoint',
				response: {
					//	200: { $ref: 'healthResponse' },
					500: { $ref: 'error' },
				},
			},
		},
		async () => {
			return HealthService.getHealthStatus();
		},
	);

	fastify.get(
		'/ready',
		{
			schema: {
				tags: ['health'],
				summary: 'Readiness check endpoint',
				response: {
					//	200: { $ref: 'healthResponse' },
					404: { $ref: 'error' },
					503: { $ref: 'error' },
				},
			},
		},
		async () => {
			// Add your readiness checks here (database connectivity, etc.)
			return HealthService.getHealthStatus();
		},
	);
}
