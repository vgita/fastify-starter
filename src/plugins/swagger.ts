import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

import { swaggerOptions, swaggerUiOptions } from '../configs/swagger.js';

async function swagger(fastify: FastifyInstance): Promise<void> {
	await fastify.register(import('@fastify/swagger'), swaggerOptions);
	await fastify.register(import('@fastify/swagger-ui'), swaggerUiOptions);
}

export default fp(swagger, {
	name: 'swagger',
});
