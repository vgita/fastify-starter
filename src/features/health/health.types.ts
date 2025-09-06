import { Type, Static } from '@sinclair/typebox';

export const HealthResponseSchema = Type.Object({
	status: Type.String(),
	timestamp: Type.String(),
	uptime: Type.Number(),
	version: Type.String(),
});

export const HealthDependenciesSchema = Type.Object({
	database: Type.String(),
	cache: Type.String(),
	external_api: Type.String(),
});

export const HealthV2ResponseSchema = Type.Object({
	status: Type.String(),
	timestamp: Type.String(),
	uptime: Type.Number(),
	version: Type.String(),
	environment: Type.String(),
	dependencies: HealthDependenciesSchema,
});

export const MemoryInfoSchema = Type.Object({
	used: Type.Number(),
	total: Type.Number(),
	percentage: Type.Number(),
});

export const SystemInfoSchema = Type.Object({
	memory: MemoryInfoSchema,
	cpu: Type.Number(),
	platform: Type.String(),
	nodeVersion: Type.String(),
});

export const SystemStatusResponseSchema = Type.Object({
	system: SystemInfoSchema,
	timestamp: Type.String(),
	version: Type.String(),
});

export type HealthResponse = Static<typeof HealthResponseSchema>;
export type HealthDependencies = Static<typeof HealthDependenciesSchema>;
export type HealthV2Response = Static<typeof HealthV2ResponseSchema>;
export type MemoryInfo = Static<typeof MemoryInfoSchema>;
export type SystemInfo = Static<typeof SystemInfoSchema>;
export type SystemStatusResponse = Static<typeof SystemStatusResponseSchema>;
