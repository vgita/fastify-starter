import { z } from 'zod';
import type { AITool } from '../ai.types.js';

const weatherToolParameters = z.object({
	city: z.string().min(1, 'City name is required'),
});

export const weatherTool: AITool = {
	name: 'get_weather',
	description: 'Get the current weather for a given city',
	parameters: weatherToolParameters,
	execute: async (input: Record<string, unknown>): Promise<string> => {
		const { city } = weatherToolParameters.parse(input);

		// Future: Call external weather API
		// const weatherData = await weatherApi.getCurrent(city);
		// return `The weather in ${city} is ${weatherData.description} with temperature ${weatherData.temperature}°C`;

		// Mock implementation for testing
		const mockWeatherConditions = ['sunny', 'cloudy', 'rainy', 'snowy'];
		const randomCondition =
			mockWeatherConditions[
				Math.floor(Math.random() * mockWeatherConditions.length)
			];
		const randomTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C

		return `The weather in ${city} is ${randomCondition} with temperature ${randomTemp}°C`;
	},
};
