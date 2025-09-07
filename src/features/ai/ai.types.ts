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

export interface AgentRequest {
	prompt: string;
	enabledTools?: string[]; // Optional tool filtering
	context?: Record<string, unknown>;
}

export interface AgentResponse {
	content: string;
	toolsUsed?: string[];
	traceId?: string;
}

export interface AITool {
	name: string;
	description: string;
	parameters: object;
	execute: (input: Record<string, unknown>) => Promise<string>;
}

export interface AIToolResult {
	toolName: string;
	input: Record<string, unknown>;
	output: string;
	executionTime: number;
}
