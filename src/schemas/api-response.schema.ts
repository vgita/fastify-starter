import { Type, TObject, TSchema } from '@sinclair/typebox';

export const SuccessResponseSchema = <T extends TSchema>(
	dataSchema: T,
): TObject =>
	Type.Object({
		isSuccess: Type.Literal(true),
		data: dataSchema,
	});

export const ErrorResponseSchema = Type.Object({
	isSuccess: Type.Literal(false),
	code: Type.Optional(Type.String()),
	message: Type.String(),
	details: Type.Optional(Type.Array(Type.String())),
});

export const successSchema = Type.Object(
	{
		isSuccess: Type.Boolean(),
		data: Type.Object({}, { additionalProperties: true }),
	},
	{ $id: 'schema:api:success' },
);

export const errorSchema = Type.Object(
	{
		isSuccess: Type.Boolean(),
		code: Type.String(),
		message: Type.String(),
		details: Type.Array(Type.String()),
	},
	{ $id: 'schema:api:error' },
);

export class ApiResponseSchemas {
	static createSuccessResponseTypebox<T extends TSchema>(
		schemaId: string,
		dataSchema: T,
	): TObject {
		return Type.Object(
			{
				isSuccess: Type.Literal(true),
				data: dataSchema,
			},
			{ $id: `schema:api:success:${schemaId}` },
		);
	}

	static createErrorResponseTypebox(schemaId: string): TObject {
		return Type.Object(
			{
				isSuccess: Type.Literal(false),
				code: Type.Optional(Type.String()),
				message: Type.String(),
				details: Type.Optional(Type.Array(Type.String())),
			},
			{ $id: `schema:api:error:${schemaId}` },
		);
	}

	static createResponseSchemasTypebox<T extends TSchema>(
		schemaId: string,
		dataSchema: T,
	): {
		success: TObject;
		error: TObject;
	} {
		return {
			success: this.createSuccessResponseTypebox(schemaId, dataSchema),
			error: this.createErrorResponseTypebox(schemaId),
		};
	}
}
