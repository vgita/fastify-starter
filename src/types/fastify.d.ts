import 'fastify';

declare module 'fastify' {
	interface FastifyInstance {
		llm: {
			getCompletion: (prompt: string) => Promise<string>;
		};
	}
}
