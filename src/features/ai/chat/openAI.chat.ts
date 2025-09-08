import type { AzureOpenAI } from 'openai';
import type { ChatMessage, ChatRequest, ChatResponse } from '../ai.types.js';

export interface ChatConfig {
	model: string;
	defaultTemperature?: number;
	defaultMaxTokens?: number;
}

export class OpenAIChat {
	constructor(
		private openAIClient: AzureOpenAI,
		private config: ChatConfig,
	) {}

	async complete(
		messages: ChatMessage[],
		options?: Partial<ChatRequest>,
	): Promise<string> {
		try {
			const requestParams = {
				model: options?.model || this.config.model,
				messages: messages.map((msg) => ({
					role: msg.role,
					content: msg.content,
				})),
				...(options?.temperature !== undefined && {
					temperature: options.temperature,
				}),
				...(this.config.defaultTemperature !== undefined &&
					options?.temperature === undefined && {
						temperature: this.config.defaultTemperature,
					}),
				...(options?.maxTokens !== undefined && {
					max_tokens: options.maxTokens,
				}),
				...(this.config.defaultMaxTokens !== undefined &&
					options?.maxTokens === undefined && {
						max_tokens: this.config.defaultMaxTokens,
					}),
			};

			const response =
				await this.openAIClient.chat.completions.create(requestParams);

			return (
				response.choices[0]?.message.content || 'No response generated'
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error';
			throw new Error(`Chat completion failed: ${errorMessage}`);
		}
	}

	async completeWithDetails(
		messages: ChatMessage[],
		options?: Partial<ChatRequest>,
	): Promise<ChatResponse> {
		try {
			const requestParams = {
				model: options?.model || this.config.model,
				messages: messages.map((msg) => ({
					role: msg.role,
					content: msg.content,
				})),
				...(options?.temperature !== undefined && {
					temperature: options.temperature,
				}),
				...(this.config.defaultTemperature !== undefined &&
					options?.temperature === undefined && {
						temperature: this.config.defaultTemperature,
					}),
				...(options?.maxTokens !== undefined && {
					max_tokens: options.maxTokens,
				}),
				...(this.config.defaultMaxTokens !== undefined &&
					options?.maxTokens === undefined && {
						max_tokens: this.config.defaultMaxTokens,
					}),
			};

			const response =
				await this.openAIClient.chat.completions.create(requestParams);

			const result: ChatResponse = {
				content:
					response.choices[0]?.message.content ||
					'No response generated',
			};

			if (response.usage) {
				result.usage = {
					promptTokens: response.usage.prompt_tokens,
					completionTokens: response.usage.completion_tokens,
					totalTokens: response.usage.total_tokens,
				};
			}

			return result;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error';
			throw new Error(`Chat completion failed: ${errorMessage}`);
		}
	}

	async simpleComplete(prompt: string): Promise<string> {
		return this.complete([{ role: 'user', content: prompt }]);
	}
}
