import { Type, Static } from '@sinclair/typebox';

export const ConversationRequestSchema = Type.Object({
	text: Type.String({ minLength: 1 }),
	configuration: Type.String({ minLength: 1 }),
	useAgent: Type.Optional(Type.Boolean()),
});

export const ConversationResponseSchema = Type.Object({
	text: Type.String({ minLength: 1 }),
});

export type ConversationRequest = Static<typeof ConversationRequestSchema>;
export type ConversationResponse = Static<typeof ConversationResponseSchema>;
