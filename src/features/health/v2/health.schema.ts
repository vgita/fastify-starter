import {
	HealthV2ResponseSchema,
	SystemStatusResponseSchema,
} from '../health.types.js';
import { ApiResponseSchemas } from '../../../schemas/api-response.schema.js';

export const healthV2ResponseSchemaId = 'health:v2:get:response';
export const systemStatusResponseSchemaId = 'health:v2:status:response';

export const healthV2ResponseSchema =
	ApiResponseSchemas.createSuccessResponseTypebox(
		healthV2ResponseSchemaId,
		HealthV2ResponseSchema,
	);

export const systemStatusResponseSchema =
	ApiResponseSchemas.createSuccessResponseTypebox(
		systemStatusResponseSchemaId,
		SystemStatusResponseSchema,
	);
