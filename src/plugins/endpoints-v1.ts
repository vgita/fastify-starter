import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

import { swaggerV1Options } from '../configs/swagger.js';
import healthV1Routes from '../features/health/v1/health.routes.js';
import conversationV1Routes from '@/features/conversation/v1/conversation.routes.js';
// import usersV1Routes from '../features/users/v1/users.routes.js';

async function endpointsV1(
	fastify: FastifyInstance,
	opts: Record<string, unknown>,
): Promise<void> {
	await fastify.register(import('@fastify/swagger'), swaggerV1Options);

	await fastify.register(import('@fastify/swagger-ui'), {
		routePrefix: '/docs/v1',
		uiConfig: { docExpansion: 'list', deepLinking: false },
		staticCSP: false,
	});

	await fastify.register(healthV1Routes, { prefix: '/api/v1', ...opts });
	await fastify.register(conversationV1Routes, {
		prefix: '/api/v1',
		...opts,
	});
	// await fastify.register(usersV1Routes, { prefix: '/api/v1', ...opts });
}

export default fp(endpointsV1, {
	name: 'endpoints-v1',
	encapsulate: true,
});
