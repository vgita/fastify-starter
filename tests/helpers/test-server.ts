import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import app from '../../src/app.js';

export async function buildTestServer(): Promise<FastifyInstance> {
	const server = Fastify({
		logger: false,
	});

	await server.register(app);
	await server.ready();

	return server;
}
