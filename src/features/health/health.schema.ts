import { HealthResponseSchema } from './health.types.js';
import { ApiResponseSchemas } from '../../schemas/api-response.schema.js';

export const healthResponseSchemaId = 'health:get:response';

export const healthResponseSchema =
	ApiResponseSchemas.createSuccessResponseTypebox(
		healthResponseSchemaId,
		HealthResponseSchema,
	);
