import { createRouter } from '@/lib/create-app';
import { createRoute, z } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { createMessageObjectSchema } from 'stoker/openapi/schemas';

export const indexRouter = createRouter().openapi(
    createRoute({
        tags: ['Index'],
        method: 'get',
        path: '/',
        responses: {
            [HttpStatusCode.OK]: jsonContent(
                createMessageObjectSchema('Tasks API'),
                'Tasks API Index'
            ),
        },
    }),
    c => {
        return c.json({ message: 'Tasks API' });
    }
);
