import Fastify from 'fastify';

import app from './app.js';
import { environment } from './configs/environment.js';

const server = Fastify({
	logger:
		environment.NODE_ENV === 'development'
			? {
					level: environment.LOG_LEVEL,
					transport: {
						target: 'pino-pretty',
						options: {
							translateTime: 'HH:MM:ss Z',
							ignore: 'pid,hostname',
						},
					},
				}
			: {
					level: environment.LOG_LEVEL,
				},
});

const start = async (): Promise<void> => {
	try {
		await server.register(app);

		await server.listen({
			port: environment.PORT,
			host: environment.HOST,
		});
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

const gracefulShutdown = async (signal: string): Promise<void> => {
	server.log.info(`Received ${signal}, shutting down gracefully...`);

	try {
		await server.close();
		server.log.info('Server closed successfully');
		process.exit(0);
	} catch (err) {
		server.log.error(err, 'Error during shutdown');
		process.exit(1);
	}
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

start();
