/**
 * API Versioning Configuration
 *
 * This file centralizes version management for the API.
 * Use this to define supported versions, deprecation policies, and routing strategies.
 */

export interface ApiVersion {
	version: string;
	prefix: string;
	deprecated?: boolean;
	deprecationDate?: Date;
	sunsetDate?: Date;
	description: string;
}

export const API_VERSIONS: Record<string, ApiVersion> = {
	v1: {
		version: '1.0.0',
		prefix: '/api/v1',
		description: 'Initial API version with core functionality',
	},
	v2: {
		version: '2.0.0',
		prefix: '/api/v2',
		description: 'Enhanced API with new features and improved responses',
	},
};

export const CURRENT_VERSION = 'v1';
export const SUPPORTED_VERSIONS = Object.keys(API_VERSIONS);

export function getVersionInfo(versionKey: string): ApiVersion | undefined {
	return API_VERSIONS[versionKey];
}

export function isVersionSupported(versionKey: string): boolean {
	return SUPPORTED_VERSIONS.includes(versionKey);
}

export function getSupportedVersions(): ApiVersion[] {
	return SUPPORTED_VERSIONS.map((key) => API_VERSIONS[key]).filter(
		(version): version is ApiVersion => version !== undefined,
	);
}
