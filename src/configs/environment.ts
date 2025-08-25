import { config } from 'dotenv';

config();

export const environment = {
	NODE_ENV: process.env['NODE_ENV'] || 'development',
	PORT: parseInt(process.env['PORT'] || '3000', 10),
	LOG_LEVEL: process.env['LOG_LEVEL'] || 'info',
	DATABASE_URL: process.env['DATABASE_URL'] || '',
} as const;

export const isDevelopment = environment.NODE_ENV === 'development';
export const isProduction = environment.NODE_ENV === 'production';
export const isTesting = environment.NODE_ENV === 'test';
