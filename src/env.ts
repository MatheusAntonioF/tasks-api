import { z, type ZodError } from 'zod';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

/**
 * i prefer to have this code at the app definition file
 */
expand(config());

const EnvSchema = z
    .object({
        NODE_ENV: z.string().default('development'),
        PORT: z.coerce.number().default(3333),
        LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
        DATABASE_URL: z.string().url(),
        DATABASE_AUTH_TOKEN: z.string().optional(),
    })
    // it's better to use superRefine here cause we can set specific error messages
    .refine(input => {
        if (input.NODE_ENV === 'production') return !!input.DATABASE_AUTH_TOKEN;

        return true;
    });

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
    env = EnvSchema.parse(process.env);
} catch (error) {
    const parsedError = error as ZodError;
    console.error(parsedError.flatten().fieldErrors);
    process.exit(1);
}

export { env };
