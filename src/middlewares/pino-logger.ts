import { pinoLogger as logger } from 'hono-pino';
import { pino } from 'pino';
import pretty from 'pino-pretty';

import { randomUUID } from 'crypto';
import { env } from '@/env';

export function pinoLogger() {
    return logger({
        pino: pino(
            {
                level: env.LOG_LEVEL || 'info', // default value is info
            },
            env.NODE_ENV === 'production' ? undefined : pretty()
        ),
        http: {
            reqId: () => {
                return randomUUID();
            },
        },
    });
}
