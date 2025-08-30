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

export const buildDataWrapperSchema = (
	refSchemaId: string,
	schema: ObjectSchema,
): ObjectSchema =>
	S.object()
		.id(`schema:api:success:${refSchemaId}`)
		.prop('isSuccess', S.boolean().default(true))
		.prop('data', schema);
