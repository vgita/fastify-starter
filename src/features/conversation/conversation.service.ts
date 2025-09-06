import { FastifyRequest } from 'fastify';
import {
	ConversationResponse,
	ConversationRequest,
} from './conversation.types.js';

export class ConversationService {
	static async createConversation(
		request: FastifyRequest<{ Body: ConversationRequest }>,
	): Promise<ConversationResponse> {
		const { text } = request.body;

		//const llmResponse = await request.server.llm.getCompletion(text);
		const agentResponse = await request.server.agent.runAgent(text);

		return {
			text: agentResponse,
		};
	}
}
