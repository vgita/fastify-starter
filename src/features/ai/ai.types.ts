import { TracingProcessor } from '@openai/agents';

export interface AITool {
	name: string;
	description: string;
	parameters: object;
	execute: (input: Record<string, unknown>) => Promise<string>;
}

export interface AgentConfig {
	name: string;
	instructions: string;
	model: string;
	tools: AITool[];
	tracingDisabled: boolean;
}

export interface OpenAIAgentConfig extends AgentConfig {
	customTraceProcessors?: TracingProcessor[];
}
