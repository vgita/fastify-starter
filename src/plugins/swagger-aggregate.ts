import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

import { aggregateSwaggerUiOptions } from '../configs/swagger.js';

// Aggregate swagger UI that provides a dropdown to navigate between API versions
async function swaggerAggregate(fastify: FastifyInstance): Promise<void> {
	await fastify.register(import('@fastify/swagger'), {
		hideUntagged: true,
	});

	await fastify.register(
		import('@fastify/swagger-ui'),
		aggregateSwaggerUiOptions,
	);
}

export default fp(swaggerAggregate, {
	name: 'swagger-aggregate',
	encapsulate: true,
});
