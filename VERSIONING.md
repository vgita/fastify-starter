# API Versioning Strategy

This document outlines the API versioning strategy implemented in this Fastify application.

## Overview

Our API uses **URL path versioning** with the structure `/api/v{major}/endpoint`. Each version has its own endpoints and Swagger documentation.

## Current Versions

### Version 1

- **Base URL**: `/api/v1`
- **Documentation**: `/docs/v1`
- **Endpoints**: `/health`, `/ready`

### Version 2 (Enhanced)

- **Base URL**: `/api/v2`
- **Documentation**: `/docs/v2`
- **Endpoints**: `/health`, `/ready`, `/status` (new)
- **Features**: Enhanced responses with dependency checks and system metrics

### API Information

- **Endpoint**: `/api/info` - Returns information about all supported API versions

## Documentation Access

- **Aggregate with Dropdown**: `/docs` (select between v1 and v2)
- **Individual**: `/docs/v1`, `/docs/v2`
- **JSON Specs**: `/docs/v1/json`, `/docs/v2/json`

## Implementation Structure

### File Organization

```
src/
├── features/
│   └── health/
│       ├── health.service.ts (shared)
│       ├── health.schema.ts (shared)
│       ├── v1/health.routes.ts
│       └── v2/health.routes.ts
├── plugins/
│   ├── endpoints-v1.ts (v1 swagger + routes)
│   ├── endpoints-v2.ts (v2 swagger + routes)
│   └── swagger-aggregate.ts (dropdown UI)
└── configs/
    ├── swagger.ts
    └── versioning.ts
```

### Plugin Pattern

Each version is an encapsulated plugin that combines swagger documentation and routes:

```typescript
// endpoints-v1.ts
async function endpointsV1(fastify, opts) {
	await fastify.register(swagger, swaggerV1Options);
	await fastify.register(swaggerUI, { routePrefix: '/docs/v1' });
	await fastify.register(healthV1Routes, { prefix: '/api/v1', ...opts });
}

export default fp(endpointsV1, { encapsulate: true });
```

### App Registration

```typescript
// app.ts
await fastify.register(endpointsV1, opts);
await fastify.register(endpointsV2, opts);
await fastify.register(swaggerAggregate); // dropdown UI
```

## Adding New Routes

To add routes (e.g., users) to a version:

1. **Create route file**: `src/features/users/v1/users.routes.ts`
2. **Import and register** in the endpoints plugin:

   ```typescript
   // endpoints-v1.ts
   import usersV1Routes from '../features/users/v1/users.routes.js';

   // Register in the same function
   await fastify.register(usersV1Routes, { prefix: '/api/v1', ...opts });
   ```

All routes in the same version will appear in the same swagger documentation automatically.

## Adding New Versions

1. **Create config**: Add to `src/configs/versioning.ts` and `src/configs/swagger.ts`
2. **Create plugin**: `src/plugins/endpoints-v3.ts`
3. **Create routes**: `src/features/[feature]/v3/[feature].routes.ts`
4. **Register**: Add to `app.ts`
5. **Update dropdown**: Add new version to aggregate swagger config

