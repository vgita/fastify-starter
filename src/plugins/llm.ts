import {
	DefaultAzureCredential,
	getBearerTokenProvider,
} from '@azure/identity';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { AzureOpenAI } from 'openai';
import { environment } from '../configs/environment.js';

enum LLM_TYPES {
	AZURE_OPENAI,
}

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

const getCompletion = async (
	prompt: string,
	llmType: LLM_TYPES = LLM_TYPES.AZURE_OPENAI,
): Promise<string> => {
	try {
		if (llmType === LLM_TYPES.AZURE_OPENAI) {
			const client = getAzureOpenAiClient();
			const response = await client.chat.completions.create({
				model: environment.AZURE_OPENAI_MODEL_NAME,
				messages: [{ role: 'user', content: prompt }],
			});
			return (
				response.choices[0]?.message.content ?? 'Something went wrong'
			);
		}
		return 'Unknown LLM type';
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		throw new Error(`LLM completion failed: ${errorMessage}`);
	}
};

async function llmPlugin(fastify: FastifyInstance): Promise<void> {
	fastify.decorate('llm', {
		getCompletion,
		getModel: getAzureOpenAiClient,
	});
}

export const metadata = {
	name: 'llm',
	dependencies: [],
};

export default fp(llmPlugin, metadata);
