import { config } from 'dotenv';

config();

export const environment = {
	NODE_ENV: process.env['NODE_ENV'] || 'development',
	HOST: process.env['HOST'] || '0.0.0.0',
	PORT: parseInt(process.env['PORT'] || '3000', 10),
	LOG_LEVEL: process.env['LOG_LEVEL'] || 'info',
	AZURE_CLIENT_ID: process.env['AZURE_CLIENT_ID'] || '',
	AZURE_TENANT_ID: process.env['AZURE_TENANT_ID'] || '',
	AZURE_CLIENT_SECRET: process.env['AZURE_CLIENT_SECRET'] || '',
	AZURE_OPENAI_ENDPOINT: process.env['AZURE_OPENAI_ENDPOINT'] || '',
	AZURE_OPENAI_MODEL_NAME: process.env['AZURE_OPENAI_MODEL_NAME'] || '',
	AZURE_OPENAI_DEPLOYMENT_NAME:
		process.env['AZURE_OPENAI_DEPLOYMENT_NAME'] || '',
	AZURE_OPENAI_API_VERSION: process.env['AZURE_OPENAI_API_VERSION'] || '',
	AZURE_CREDENTIALS_SCOPE:
		process.env['AZURE_CREDENTIALS_SCOPE'] ||
		'https://cognitiveservices.azure.com/.default',
	DATABASE_URL: process.env['DATABASE_URL'] || '',
} as const;

export const isDevelopment = environment.NODE_ENV === 'development';
export const isProduction = environment.NODE_ENV === 'production';
export const isTesting = environment.NODE_ENV === 'test';
