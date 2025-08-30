import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

import { swaggerV2Options } from '../configs/swagger.js';
import healthV2Routes from '../features/health/v2/health.routes.js';

async function endpointsV2(
	fastify: FastifyInstance,
	opts: Record<string, unknown>,
): Promise<void> {
	await fastify.register(import('@fastify/swagger'), swaggerV2Options);

	await fastify.register(import('@fastify/swagger-ui'), {
		routePrefix: '/docs/v2',
		uiConfig: { docExpansion: 'list', deepLinking: false },
		staticCSP: false,
	});

	// Register v2 routes
	await fastify.register(healthV2Routes, { prefix: '/api/v2', ...opts });
}

export default fp(endpointsV2, {
	name: 'endpoints-v2',
	encapsulate: true,
});
