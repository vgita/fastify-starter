import type { AzureOpenAI } from 'openai';
import { environment } from '../../../configs/environment.js';
import { weatherTool, timeTool } from '../tools/index.js';
import { OpenAIAgent } from '../agents/openAI.agent.js';
import LocalFileTracingProcessor from '../tracing/openAI.tracing.js';
import { OpenAIAgentConfig } from '../ai.types.js';

const OPENAI_AGENT_CONFIG: OpenAIAgentConfig = {
	name: 'AI Assistant',
	instructions:
		'You are a helpful AI assistant that can use various tools to provide accurate and useful information.',
	model: environment.AZURE_OPENAI_DEPLOYMENT_NAME,
	tools: [weatherTool, timeTool],
	tracingDisabled: false,
	customTraceProcessors: [LocalFileTracingProcessor],
};

export class AgentFactory {
	constructor(private openAIClient: AzureOpenAI) {}

	createOpenAiAgent(): OpenAIAgent {
		return new OpenAIAgent(this.openAIClient, OPENAI_AGENT_CONFIG);
	}
}
