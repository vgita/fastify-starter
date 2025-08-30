import S, { ObjectSchema } from 'fluent-json-schema';

export const successSchema = S.object()
	.id('schema:api:success')
	.prop('isSuccess', S.boolean())
	.prop('data', S.object());

export const errorSchema = S.object()
	.id('schema:api:error')
	.prop('isSuccess', S.boolean())
	.prop('code', S.string())
	.prop('message', S.string())
	.prop('details', S.array().items(S.string()))
	.required(['message']);

export class ApiResponseSchemas {
	static createSuccessResponse(
		schemaId: string,
		dataSchema: ObjectSchema,
	): ObjectSchema {
		return S.object()
			.id(`schema:api:success:${schemaId}`)
			.prop('isSuccess', S.boolean().const(true).default(true))
			.prop('data', dataSchema)
			.required(['isSuccess', 'data']);
	}

	static createErrorResponse(schemaId: string): ObjectSchema {
		return S.object()
			.id(`schema:api:error:${schemaId}`)
			.prop('isSuccess', S.boolean().const(false).default(false))
			.prop('code', S.string())
			.prop('message', S.string())
			.prop('details', S.array().items(S.string()))
			.required(['isSuccess', 'message']);
	}

	static createResponseSchemas(
		schemaId: string,
		dataSchema: ObjectSchema,
	): {
		success: ObjectSchema;
		error: ObjectSchema;
	} {
		return {
			success: this.createSuccessResponse(schemaId, dataSchema),
			error: this.createErrorResponse(schemaId),
		};
	}
}
