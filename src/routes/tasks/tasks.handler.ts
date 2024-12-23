import type { AppRouteHandler } from '@/lib/types';
import * as HttpStatusCode from 'stoker/http-status-codes';
import type {
    CreateRoute,
    GetOneRoute,
    ListRoute,
    PatchRoute,
    RemoveRoute,
} from './tasks.routes';
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { NOT_FOUND } from 'stoker/http-status-phrases';
import { eq } from 'drizzle-orm';

export const list: AppRouteHandler<ListRoute> = async c => {
    const tasks = await db.query.tasks.findMany();

    return c.json(tasks);
};

export const getOne: AppRouteHandler<GetOneRoute> = async c => {
    const { id } = c.req.valid('param');

    const task = await db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });

    if (!task) {
        return c.json({ message: NOT_FOUND }, HttpStatusCode.NOT_FOUND);
    }

    return c.json(task, HttpStatusCode.OK);
};

export const create: AppRouteHandler<CreateRoute> = async c => {
    const task = c.req.valid('json');

    const [createdTask] = await db.insert(tasks).values(task).returning();

    return c.json(createdTask, HttpStatusCode.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async c => {
    const { id } = c.req.valid('param');
    const updates = c.req.valid('json');

    const [task] = await db
        .update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();

    if (!task) {
        return c.json({ message: NOT_FOUND }, HttpStatusCode.NOT_FOUND);
    }

    return c.json(task, HttpStatusCode.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async c => {
    const { id } = c.req.valid('param');

    const result = await db.delete(tasks).where(eq(tasks.id, id));

    if (result.rowsAffected === 0) {
        return c.json({ message: NOT_FOUND }, HttpStatusCode.NOT_FOUND);
    }

    return c.body(null, HttpStatusCode.NO_CONTENT);
};
