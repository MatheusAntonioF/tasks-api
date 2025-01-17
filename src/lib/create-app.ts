import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { pinoLogger } from '@/middlewares/pino-logger';
import type { AppBindings, AppOpenApi } from './types';

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        /**
         * Hono by default differentiate between /error and /error/
         * with the strict set to false we can disable this feature
         */
        strict: false,
        defaultHook: defaultHook,
    });
}

export function createApp() {
    const app = createRouter();

    app.use(serveEmojiFavicon('🔥')); // it does not matter
    app.use(pinoLogger());

    app.notFound(notFound);
    app.onError(onError);

    return app;
}

export function createTestApp(router: AppOpenApi) {
    const testApp = createApp();

    testApp.route('/', router);

    return testApp;
}
