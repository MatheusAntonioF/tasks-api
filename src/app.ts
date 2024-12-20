import type { PinoLogger } from 'hono-pino';
import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError } from 'stoker/middlewares';

import { pinoLogger } from './middlewares/pino-logger';

interface AppBindings {
    Variables: {
        logger: PinoLogger;
    };
}

export const app = new OpenAPIHono<AppBindings>();

app.use(pinoLogger());

app.notFound(notFound);
app.onError(onError);

app.get('/', c => {
    return c.text('Hello Hono!');
});
