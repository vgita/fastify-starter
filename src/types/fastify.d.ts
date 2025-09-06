import 'fastify';
import { AzureOpenAI } from 'openai';

declare module 'fastify' {
	interface FastifyInstance {
		llm: {
			getCompletion: (prompt: string) => Promise<string>;
			getModel: () => AzureOpenAI;
		};
		agent: {
			runAgent: (prompt: string) => Promise<string>;
		};
	}
}
