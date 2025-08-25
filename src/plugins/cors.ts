import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function corsPlugin(fastify: FastifyInstance): Promise<void> {
	await fastify.register(cors, {
		origin: true, // Allow all origins
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	});
}

export default fp(corsPlugin, {
	name: 'cors',
});
