import type { AzureOpenAI } from 'openai';
import { environment } from '../../../configs/environment.js';
import { weatherTool, timeTool } from '../tools/index.js';
import { OpenAIAgent } from '../agents/openAI.agent.js';

export class AgentFactory {
	constructor(private openAIClient: AzureOpenAI) {}

	createOpenAiAgent(): OpenAIAgent {
		const config = {
			name: 'AI Assistant',
			instructions:
				'You are a helpful AI assistant that can use various tools to provide accurate and useful information.',
			model: environment.AZURE_OPENAI_DEPLOYMENT_NAME,
			enableTracing: true,
			tools: [weatherTool, timeTool],
		};
		return new OpenAIAgent(this.openAIClient, config);
	}
}
