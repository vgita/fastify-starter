import S from 'fluent-json-schema';
import { buildDataWrapperSchema } from '../../schemas/api-response.schema.js';

export const healthResponseSchemaId = 'schema:health:get:resp';
export const healthResponseSchema = buildDataWrapperSchema(
	healthResponseSchemaId,
	S.object()
		.prop('status', S.string())
		.prop('timestamp', S.string())
		.prop('uptime', S.number())
		.prop('version', S.string())
		.required(['status', 'timestamp', 'uptime', 'version']),
);
