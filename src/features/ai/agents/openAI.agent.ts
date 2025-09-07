import type { AzureOpenAI } from 'openai';
import {
	Agent,
	run,
	tool,
	setDefaultOpenAIClient,
	withTrace,
	setTraceProcessors,
} from '@openai/agents';
import type { AITool } from '../ai.types.js';
import { SomeZodObject } from 'zod';
import LocalFileTracingProcessor from '../tracing/openAI.tracing.js';

export interface AgentConfig {
	name: string;
	instructions: string;
	model: string;
	enableTracing: boolean;
	tools: AITool[];
}

export class OpenAIAgent {
	private agent: Agent;

	constructor(
		private openAIClient: AzureOpenAI,
		config: AgentConfig,
	) {
		setDefaultOpenAIClient(this.openAIClient);

		if (config.enableTracing) {
			setTraceProcessors([LocalFileTracingProcessor]);
		}

		const openAITools = config.tools.map((aiTool) => {
			return tool({
				name: aiTool.name,
				description: aiTool.description,
				parameters: aiTool.parameters as SomeZodObject,
				execute: async (input) => {
					return aiTool.execute(input as Record<string, unknown>);
				},
			});
		});

		this.agent = new Agent({
			model: config.model,
			name: config.name,
			instructions: config.instructions,
			tools: openAITools,
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
				metadata: { prompt },
			},
		);

		return resultText;
	}
}
