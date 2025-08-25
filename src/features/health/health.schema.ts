export const healthResponseSchema = {
	$id: 'healthResponse',
	type: 'object',
	properties: {
		status: { type: 'string' },
		timestamp: { type: 'string' },
		uptime: { type: 'number' },
		version: { type: 'string' },
	},
	required: ['status', 'timestamp', 'uptime', 'version'],
};
