import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { AgentFactory } from '../features/ai/factories/agent.factory.js';
import { ChatFactory } from '../features/ai/factories/chat.factory.js';
import { metadata as llmMetadata } from './llm.js';

import {
	DefaultAzureCredential,
	getBearerTokenProvider,
} from '@azure/identity';
import { AzureOpenAI } from 'openai';
import { environment } from '../configs/environment.js';

const getAzureOpenAiClient = (): AzureOpenAI => {
	const credential = new DefaultAzureCredential();
	const azureADTokenProvider = getBearerTokenProvider(
		credential,
		environment.AZURE_CREDENTIALS_SCOPE,
	);

	return new AzureOpenAI({
		endpoint: environment.AZURE_OPENAI_ENDPOINT,
		azureADTokenProvider,
		deployment: environment.AZURE_OPENAI_DEPLOYMENT_NAME,
		apiVersion: environment.AZURE_OPENAI_API_VERSION,
	});
};

async function aiPlugin(fastify: FastifyInstance): Promise<void> {
	const azureOpenAI = getAzureOpenAiClient();

	const chatFactory = new ChatFactory(azureOpenAI);
	const agentFactory = new AgentFactory(azureOpenAI);

	fastify.decorate('ai', {
		chatFactory,
		agentFactory,
	});
}

export const metadata = {
	name: 'ai',
	dependencies: [llmMetadata.name],
};

export default fp(aiPlugin, metadata);
