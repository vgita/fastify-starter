import { FastifyRequest } from 'fastify';
import {
	ConversationResponse,
	ConversationRequest,
} from './conversation.types.js';

export class ConversationService {
	static async createConversation(
		request: FastifyRequest<{ Body: ConversationRequest }>,
	): Promise<ConversationResponse> {
		const { text, configuration } = request.body;

		// Simulate a conversation response (replace with actual logic)
		return {
			text: `You said: ${text} with configuration: ${configuration}`,
		};
	}
}
