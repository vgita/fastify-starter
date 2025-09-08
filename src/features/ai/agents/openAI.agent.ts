import type { AzureOpenAI } from 'openai';
import {
	Agent,
	run,
	tool,
	setDefaultOpenAIClient,
	setTracingDisabled,
	withTrace,
	setTraceProcessors,
} from '@openai/agents';
import type { AITool, OpenAIAgentConfig } from '../ai.types.js';
import { SomeZodObject } from 'zod';

export class OpenAIAgent {
	private agent: Agent;

	constructor(
		private openAIClient: AzureOpenAI,
		config: OpenAIAgentConfig,
	) {
		setDefaultOpenAIClient(this.openAIClient);
		this.setTracing(config);
		this.agent = new Agent({
			model: config.model,
			name: config.name,
			instructions: config.instructions,
			tools: config.tools.map(this.getOpenAiTool),
		});
	}

	async run(prompt: string): Promise<string> {
		let resultText = 'No output generated';

		await withTrace(
			`${this.agent.name} agent workflow`,
			async (t) => {
				const runResult = await run(this.agent, prompt);
				resultText = runResult.finalOutput ?? resultText;

				t.metadata = {
					...(t.metadata ?? {}),
					output: resultText,
				};
			},
			{
				groupId: 'dummy-group', //to link multiple traces from the same conversation
				metadata: { prompt },
			},
		);

		return resultText;
	}

	getOpenAiTool = (aiTool: AITool): ReturnType<typeof tool> =>
		tool({
			name: aiTool.name,
			description: aiTool.description,
			parameters: aiTool.parameters as SomeZodObject,
			execute: async (input) => {
				return aiTool.execute(input as Record<string, unknown>);
			},
		});

	setTracing = (config: OpenAIAgentConfig): void => {
		if (config.tracingDisabled) {
			setTracingDisabled(true);
		} else {
			setTracingDisabled(false);
			if (config.customTraceProcessors?.length) {
				setTraceProcessors(config.customTraceProcessors);
			}
		}
	};
}
