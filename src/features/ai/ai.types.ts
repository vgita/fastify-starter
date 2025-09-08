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

export interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export interface ChatRequest {
	messages: ChatMessage[];
	model?: string;
	temperature?: number;
	maxTokens?: number;
}

export interface ChatResponse {
	content: string;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}
