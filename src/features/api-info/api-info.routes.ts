import type { FastifyInstance } from 'fastify';
import { getSupportedVersions } from '../../configs/versioning.js';

const tags = ['api-info'];

export default async function apiInfoRoutes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.get(
		'/info',
		{
			schema: {
				tags: tags,
				summary: 'API information endpoint',
				description: 'Returns information about supported API versions',
				response: {
					200: {
						type: 'object',
						properties: {
							success: { type: 'boolean' },
							data: {
								type: 'object',
								properties: {
									name: { type: 'string' },
									description: { type: 'string' },
									versions: {
										type: 'array',
										items: {
											type: 'object',
											properties: {
												version: { type: 'string' },
												prefix: { type: 'string' },
												description: { type: 'string' },
												deprecated: { type: 'boolean' },
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		async () => {
			const data = {
				name: 'Fastify API',
				description: 'RESTful API built with Fastify and TypeScript',
				versions: getSupportedVersions(),
			};

			return data;
		},
	);
}
