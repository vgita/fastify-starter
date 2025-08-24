import type { FastifyInstance } from 'fastify';

import { serverOptions } from './configs/server-options.js';

// Import schemas
import schemaLoader from './schemas/loader.js';

// Import plugins
import corsPlugin from './plugins/cors.js';
import rateLimitPlugin from './plugins/rate-limit.js';
import swaggerPlugin from './plugins/swagger.js';

// Import routes
import healthRoutes from './features/health/health.routes.js';

export default async function app(
  fastify: FastifyInstance,
  opts: Record<string, unknown>,
): Promise<void> {
  // Register schemas first
  await fastify.register(schemaLoader);

  // Register plugins
  await fastify.register(corsPlugin, opts);
  await fastify.register(rateLimitPlugin, opts);
  await fastify.register(swaggerPlugin, opts);

  // Register routes with API prefix
  await fastify.register(healthRoutes, {
    prefix: '/api',
    ...opts,
  });
}

export { serverOptions as options };
