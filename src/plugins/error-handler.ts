import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { getErrorCode, formatDetails } from './api-response.js';

export default fp(function errorHandlerPlugin(
	fastify: FastifyInstance,
	_opts: FastifyPluginOptions,
	next: () => void,
): void {
	fastify.setErrorHandler((err, req, reply) => {
		if (err.code === 'ECANCEL') {
			req.log.info('Request cancelled by client.');
			if (!reply.sent) {
				reply.status(499).send({
					isSuccess: false,
					code: getErrorCode(499),
					message: 'Request cancelled by client.',
					details: [],
				});
			}
			return;
		}

		let statusCode = err.statusCode;

		if (!statusCode) {
			statusCode = 500;
		}

		if (statusCode >= 500) {
			fastify.log.error(err);

			reply.status(statusCode).send({
				isSuccess: false,
				code: getErrorCode(statusCode),
				message: err.message || 'An unexpected error occurred.',
				details: formatDetails(err.stack),
			});
		} else {
			const details = err.validation?.length
				? err.validation
				: err.stack
					? [err.stack]
					: [];

			reply.status(statusCode).send({
				isSuccess: false,
				code: getErrorCode(statusCode),
				message: err.message,
				details: formatDetails(details),
			});
		}
	});

	next();
});
