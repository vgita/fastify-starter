import 'fastify';
import { AzureOpenAI } from 'openai';
import type { AgentFactory } from '../features/ai/factories/agent.factory.js';
import type { ChatFactory } from '../features/ai/factories/chat.factory.js';

declare module 'fastify' {
	interface FastifyInstance {
		azureOpenAI: AzureOpenAI;
		ai: {
			chatFactory: ChatFactory;
			agentFactory: AgentFactory;
		};
	}
}
