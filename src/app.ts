import type { FastifyInstance } from 'fastify';

import { serverOptions } from './configs/server-options.js';

// Import schemas
import schemaLoader from './schemas/loader.js';

// Import plugins
import corsPlugin from './plugins/cors.js';
import rateLimitPlugin from './plugins/rate-limit.js';
import errorHandler from './plugins/error-handler.js';
import apiResponse from './plugins/api-response.js';
import endpointsV1 from './plugins/endpoints-v1.js';
import endpointsV2 from './plugins/endpoints-v2.js';
import swaggerAggregate from './plugins/swagger-aggregate.js';
import llmPlugin from './plugins/llm.js';

// Import routes
import apiInfoRoutes from './features/api-info/api-info.routes.js';

export default async function app(
	fastify: FastifyInstance,
	opts: Record<string, unknown>,
): Promise<void> {
	// Register schemas first
	await fastify.register(schemaLoader);

	// Register plugins
	await fastify.register(corsPlugin, opts);
	await fastify.register(rateLimitPlugin, opts);
	await fastify.register(errorHandler, opts);
	await fastify.register(apiResponse, opts);
	await fastify.register(llmPlugin, opts);

	// Register endpoints plugins with routes in encapsulated contexts
	await fastify.register(endpointsV1, opts);
	await fastify.register(endpointsV2, opts);

	// Register aggregate swagger in its own context
	await fastify.register(swaggerAggregate);

	// Register API info endpoint
	await fastify.register(apiInfoRoutes, {
		prefix: '/api',
		...opts,
	});
}

export { serverOptions as options };
