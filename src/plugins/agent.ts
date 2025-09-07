import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';
import {
	Agent,
	run,
	tool,
	setDefaultOpenAIClient,
	withTrace,
	setTraceProcessors,
	TracingProcessor,
} from '@openai/agents';

import { metadata as llmMetadata } from './llm.js';
import { environment } from '../configs/environment.js';

import { promises as fs } from 'fs';
import path from 'path';

const TRACES_DIR = path.resolve(process.cwd(), 'traces');
async function ensureDir(): Promise<void> {
	await fs.mkdir(TRACES_DIR, { recursive: true });
}

const LocalFileTracingProcessor: TracingProcessor = {
	start() {
		void ensureDir();
	},

	async onTraceStart(_trace) {},

	async onTraceEnd(trace) {
		await ensureDir();
		const file = path.join(TRACES_DIR, `${trace.traceId}.json`);
		await fs.writeFile(file, JSON.stringify(trace, null, 2), 'utf-8');
	},

	async onSpanStart(_span) {},

	async onSpanEnd(span) {
		await ensureDir();
		const line = JSON.stringify(span) + '\n';
		await fs.appendFile(
			path.join(TRACES_DIR, 'spans.ndjson'),
			line,
			'utf-8',
		);
	},

	async forceFlush() {},

	async shutdown(_timeout) {},
};

setTraceProcessors([LocalFileTracingProcessor]);

const getWeatherTool = tool({
	name: 'get_weather',
	description: 'Get the weather for a given city',
	parameters: z.object({ city: z.string() }),
	execute: async (input) => `The weather in ${input.city} is shiny`,
});

const getTimeTool = tool({
	name: 'get_time',
	description: 'Get the current time in a given city',
	parameters: z.object({ city: z.string() }),
	execute: async (input) => {
		const date = new Date().toLocaleString('en-US');
		return `The current time in ${input.city} is ${date}`;
	},
});

function getAgent(fastify: FastifyInstance): Agent {
	const azureOpenAI = fastify.llm.getModel();
	setDefaultOpenAIClient(azureOpenAI);
	return new Agent({
		model: environment.AZURE_OPENAI_DEPLOYMENT_NAME,
		name: 'Data agent',
		instructions: 'You are a data agent.',
		tools: [getWeatherTool, getTimeTool],
	});
}

async function runAgent(
	fastify: FastifyInstance,
	prompt: string,
): Promise<string> {
	const agent = getAgent(fastify);

	let resultText = 'No output generated';

	await withTrace(
		'Agent workflow',
		async (t) => {
			const runResult = await run(agent, prompt);
			resultText = runResult.finalOutput ?? resultText;

			t.metadata = { ...(t.metadata ?? {}), output: resultText };
		},
		{
			metadata: { prompt },
		},
	);

	return resultText;
}

async function agentPlugin(fastify: FastifyInstance): Promise<void> {
	fastify.decorate('agent', {
		runAgent: (prompt: string) => runAgent(fastify, prompt),
	});
}

export const metadata = {
	name: 'agent',
	dependencies: [llmMetadata.name],
};

export default fp(agentPlugin, metadata);
