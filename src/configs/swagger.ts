import type { SwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export function createSwaggerOptions(version: string): SwaggerOptions {
	return {
		openapi: {
			info: {
				title: 'Fastify API',
				description: `API built with Fastify - Version ${version}`,
				version: version,
			},
		},
		hideUntagged: true,
	};
}

export const swaggerV1Options: SwaggerOptions = createSwaggerOptions('1.0.0');
export const swaggerV2Options: SwaggerOptions = createSwaggerOptions('2.0.0');

export const aggregateSwaggerUiOptions: FastifySwaggerUiOptions = {
	routePrefix: '/docs',
	uiConfig: {
		urls: [
			{ url: '/docs/v1/json', name: 'API v1' },
			{ url: '/docs/v2/json', name: 'API v2' },
		],
		docExpansion: 'list',
		deepLinking: false,
		...({ 'urls.primaryName': 'API v1' } as Record<string, unknown>),
	},
	staticCSP: false,
};
