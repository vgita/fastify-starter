import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export interface ErrorPayload {
	isSuccess: false;
	code?: string;
	message?: string;
	details?: string[];
}

export interface SuccessPayload {
	isSuccess: true;
	data?: unknown;
}

export const ERROR_CODES = new Map<number, string>([
	[400, 'BAD_REQUEST'],
	[401, 'UNAUTHORIZED'],
	[403, 'FORBIDDEN'],
	[404, 'NOT_FOUND'],
	[409, 'CONFLICT'],
	[422, 'VALIDATION_ERROR'],
	[429, 'TOO_MANY_REQUESTS'],
	[499, 'CLIENT_CLOSED_REQUEST'],
	[500, 'INTERNAL_SERVER_ERROR'],
	[502, 'BAD_GATEWAY'],
	[503, 'SERVICE_UNAVAILABLE'],
]);

export const ERROR_MESSAGES = new Map<number, string>([
	[400, 'Bad Request'],
	[401, 'Unauthorized'],
	[403, 'Forbidden'],
	[404, 'Not Found'],
	[409, 'Conflict'],
	[422, 'Validation Error'],
	[429, 'Too Many Requests'],
	[500, 'Internal Server Error'],
	[502, 'Bad Gateway'],
	[503, 'Service Unavailable'],
]);

export const getErrorCode = (statusCode: number): string =>
	ERROR_CODES.get(statusCode) || 'ERROR';

export const getDefaultErrorMessage = (statusCode: number): string =>
	ERROR_MESSAGES.get(statusCode) || 'An error occurred';

export const formatDetails = (details: unknown): string[] => {
	if (!details) return [];
	if (Array.isArray(details)) {
		return details.map((item) =>
			typeof item === 'string'
				? item
				: item.instancePath && item.message
					? JSON.stringify({
							path: item.instancePath,
							message: item.message,
						})
					: JSON.stringify(item),
		);
	}
	return [typeof details === 'string' ? details : JSON.stringify(details)];
};

const apiResponsePlugin = async (fastify: FastifyInstance): Promise<void> => {
	fastify.addHook('preSerialization', async (request, reply, payload) => {
		if (!request.routeOptions?.url?.startsWith('/api')) {
			return payload;
		}

		const statusCode = reply.statusCode;

		if (statusCode >= 200 && statusCode < 300) {
			return {
				isSuccess: true,
				data: payload,
			} as SuccessPayload;
		}

		if (statusCode >= 400) {
			const errorPayload = payload as ErrorPayload;
			return {
				isSuccess: false,
				code: errorPayload?.code || getErrorCode(statusCode),
				message: errorPayload?.message || getDefaultErrorMessage(statusCode),
				details: formatDetails(errorPayload?.details),
			} as ErrorPayload;
		}

		return payload;
	});
};

export const metadata = {
	name: 'api-response',
};

export default fp(apiResponsePlugin, metadata);
