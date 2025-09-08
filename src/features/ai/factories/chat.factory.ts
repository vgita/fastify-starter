import type { AzureOpenAI } from 'openai';
import { environment } from '../../../configs/environment.js';
import { OpenAIChat } from '../chat/openAI.chat.js';

export class ChatFactory {
	constructor(private openAIClient: AzureOpenAI) {}

	createOpenAiChat(): OpenAIChat {
		const config = {
			model: environment.AZURE_OPENAI_MODEL_NAME,
			defaultTemperature: 0.7,
			defaultMaxTokens: 1000,
		};
		return new OpenAIChat(this.openAIClient, config);
	}
}
