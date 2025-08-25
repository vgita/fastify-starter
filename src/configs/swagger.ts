import type { SwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerOptions: SwaggerOptions = {
	openapi: {
		info: {
			title: 'Fastify API',
			description: 'API built with Fastify',
			version: '1.0.0',
		},
	},
	hideUntagged: true,
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
	routePrefix: '/docs',
	uiConfig: {
		docExpansion: 'list',
		deepLinking: false,
	},
	staticCSP: false, // Disable CSP for development
};
