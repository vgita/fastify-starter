import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { errorSchema, successSchema } from './api-response.schema.js';
import * as healthSchemas from '../features/health/health.schema.js';
import * as healthV2Schemas from '../features/health/v2/health.schema.js';
import * as conversationSchemas from '../features/conversation/conversation.schema.js';

async function schemaLoader(fastify: FastifyInstance): Promise<void> {
	fastify.addSchema(successSchema);
	fastify.addSchema(errorSchema);

	fastify.addSchema(healthSchemas.healthResponseSchema);
	fastify.addSchema(healthV2Schemas.healthV2ResponseSchema);
	fastify.addSchema(healthV2Schemas.systemStatusResponseSchema);
	fastify.addSchema(conversationSchemas.conversationResponseSchema);
}

export default fp(schemaLoader, {
	name: 'schema-loader',
});
