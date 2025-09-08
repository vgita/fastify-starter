import { FastifyRequest } from 'fastify';
import {
	ConversationResponse,
	ConversationRequest,
} from './conversation.types.js';

export class ConversationService {
	static async createConversation(
		request: FastifyRequest<{ Body: ConversationRequest }>,
	): Promise<ConversationResponse> {
		const { text, useAgent = true } = request.body;

		let response: string;

		if (useAgent) {
			// Create an agent with the tools it needs
			const agent = request.server.ai.agentFactory.createOpenAiAgent();

			response = await agent.run(text);
		} else {
			// Use simple chat completion for basic queries
			const chat = request.server.ai.chatFactory.createOpenAiChat();
			response = await chat.simpleComplete(text);
		}

		return {
			text: response,
		};
	}
}
