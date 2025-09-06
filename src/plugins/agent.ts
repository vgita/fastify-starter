import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';
import { Agent, run, tool, setDefaultOpenAIClient } from '@openai/agents';

import { metadata as llmMetadata } from './llm.js';
import { environment } from '../configs/environment.js'; // for the deployment name, optional but handy

const getWeatherTool = tool({
	name: 'get_weather',
	description: 'Get the weather for a given city',
	parameters: z.object({ city: z.string() }),
	execute: async (input) => {
		return `The weather in ${input.city} is shiny`;
	},
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

	const agent = new Agent({
		model: environment.AZURE_OPENAI_DEPLOYMENT_NAME,
		name: 'Data agent',
		instructions: 'You are a data agent.',
		tools: [getWeatherTool, getTimeTool],
	});

	return agent;
}

async function runAgent(
	fastify: FastifyInstance,
	prompt: string,
): Promise<string> {
	const agent = getAgent(fastify);
	const result = await run(agent, prompt);
	return result.finalOutput ?? 'No output generated';
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
