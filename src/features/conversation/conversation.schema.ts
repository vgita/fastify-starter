import {
	ConversationRequestSchema,
	ConversationResponseSchema,
} from './conversation.types.js';
import { ApiResponseSchemas } from '../../schemas/api-response.schema.js';

export const conversationRequestSchemaId = 'conversation:create:request';
export const conversationResponseSchemaId = 'conversation:create:response';

export const conversationRequestSchema = ConversationRequestSchema;

export const conversationResponseSchema =
	ApiResponseSchemas.createSuccessResponseTypebox(
		conversationResponseSchemaId,
		ConversationResponseSchema,
	);
