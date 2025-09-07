import { z } from 'zod';
import type { AITool } from '../ai.types.js';

const timeToolParameters = z.object({
	city: z.string().min(1, 'City name is required'),
});

export const timeTool: AITool = {
	name: 'get_time',
	description: 'Get the current time in a given city',
	parameters: timeToolParameters,
	execute: async (input: Record<string, unknown>): Promise<string> => {
		const { city } = timeToolParameters.parse(input);

		// Future: Call external timezone API to get accurate time
		// const timeData = await timezoneApi.getCurrentTime(city);
		// return `The current time in ${city} is ${timeData.localTime}`;

		// Mock implementation for testing
		const currentDate = new Date();
		const randomOffset = Math.floor(Math.random() * 24) - 12; // -12 to +12 hours
		const cityTime = new Date(
			currentDate.getTime() + randomOffset * 60 * 60 * 1000,
		);
		const formattedTime = cityTime.toLocaleString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});

		return `The current time in ${city} is ${formattedTime}`;
	},
};
