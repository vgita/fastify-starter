import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';

import { buildTestServer } from '../../../../tests/helpers/test-server.js';

describe('Health Routes', () => {
	let server: FastifyInstance;

	beforeAll(async () => {
		server = await buildTestServer();
	});

	afterAll(async () => {
		if (server) {
			await server.close();
		}
	});

	it('should return health status', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/api/health',
		});

		expect(response.statusCode).toBe(200);

		const body = JSON.parse(response.body);
		expect(body).toHaveProperty('data');

		const data = body.data;
		expect(data).toHaveProperty('status', 'healthy');
		expect(data).toHaveProperty('timestamp');
		expect(data).toHaveProperty('uptime');
		expect(data).toHaveProperty('version');
	});

	it('should return readiness status', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/api/ready',
		});

		expect(response.statusCode).toBe(200);
	});
});
