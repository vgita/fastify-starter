export const successSchema = {
	$id: 'success',
	type: 'object',
	properties: {
		isSuccess: { type: 'boolean' },
		data: { type: 'object' },
	},
};

export const errorSchema = {
	$id: 'error',
	type: 'object',
	properties: {
		isSuccess: { type: 'boolean' },
		code: { type: 'string' },
		message: { type: 'string' },
		details: { type: 'array', items: { type: 'string' } },
	},
	required: ['message'],
};
