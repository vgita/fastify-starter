import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { errorSchema, successSchema } from './api-response.schema.js';

async function schemaLoader(fastify: FastifyInstance): Promise<void> {
	fastify.addSchema(successSchema);
	fastify.addSchema(errorSchema);
}

export default fp(schemaLoader, {
	name: 'schema-loader',
});
