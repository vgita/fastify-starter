import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { errorSchema, successSchema } from './api-response.schema.js';
import * as healthSchemas from '../features/health/health.schema.js';

async function schemaLoader(fastify: FastifyInstance): Promise<void> {
	fastify.addSchema(successSchema);
	fastify.addSchema(errorSchema);

	fastify.addSchema(healthSchemas.healthResponseSchema);
}

export default fp(schemaLoader, {
	name: 'schema-loader',
});
