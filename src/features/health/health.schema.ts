import S from 'fluent-json-schema';
import { ApiResponseSchemas } from '../../schemas/api-response.schema.js';

export const healthResponseSchemaId = 'health:get:response';

const healthDataSchema = S.object()
	.prop('status', S.string())
	.prop('timestamp', S.string())
	.prop('uptime', S.number())
	.prop('version', S.string())
	.required(['status', 'timestamp', 'uptime', 'version']);

export const healthResponseSchema = ApiResponseSchemas.createSuccessResponse(
	healthResponseSchemaId,
	healthDataSchema,
);
