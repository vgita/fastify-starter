import { type FastifyInstance, type FastifyRequest } from 'fastify';

import { ConversationService } from '../conversation.service.js';
import { ConversationRequest } from '../conversation.types.js';
import {
	conversationRequestSchema,
	conversationResponseSchema,
} from '../conversation.schema.js';

const tags = ['conversation'];

export default async function conversationV1Routes(
	fastify: FastifyInstance,
): Promise<void> {
	fastify.post<{ Body: ConversationRequest }>(
		'/',
		{
			schema: {
				tags,
				body: conversationRequestSchema,
				response: {
					200: conversationResponseSchema,
				},
			},
		},
		async (request: FastifyRequest<{ Body: ConversationRequest }>) =>
			ConversationService.createConversation(request),
	);
}
