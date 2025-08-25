import type { FastifyServerOptions } from 'fastify';

import { environment } from './environment.js';

export const serverOptions: FastifyServerOptions = {
	logger: {
		level: environment.LOG_LEVEL,
		...(environment.NODE_ENV === 'development' && {
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'HH:MM:ss Z',
					ignore: 'pid,hostname',
				},
			},
		}),
	},
	disableRequestLogging: false,
	requestIdHeader: 'x-request-id',
	requestIdLogLabel: 'reqId',
};
