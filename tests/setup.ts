import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  // Global test setup
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  // Global test cleanup
});
