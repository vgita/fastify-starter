import rateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function rateLimitPlugin(fastify: FastifyInstance): Promise<void> {
	await fastify.register(rateLimit, {
		max: 100,
		timeWindow: '1 minute',
	});
}

export default fp(rateLimitPlugin, {
	name: 'rate-limit',
});
