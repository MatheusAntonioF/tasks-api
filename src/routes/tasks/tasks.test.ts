import { describe, expect, expectTypeOf, it } from 'vitest';
import { tasksRouter } from './tasks.index';
import { createTestApp } from '@/lib/create-app';

describe('Tasks', () => {
    it('responds with an array', async () => {
        const testRouter = createTestApp(tasksRouter);
        const response = await testRouter.request('/tasks');

        const result = await response.json();
        console.log('🚀 ~ result:', result);
        // @ts-ignore
        expectTypeOf(result).toBeArray();
    });
});
