import {
    insertTasksSchema,
    patchTasksSchema,
    selectTasksSchema,
} from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCode from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas';

const tags = ['Tasks'];

export const list = createRoute({
    tags,
    path: '/tasks',
    method: 'get',
    responses: {
        [HttpStatusCode.OK]: jsonContent(
            selectTasksSchema.array(),
            'The list of tasks'
        ),
    },
});

export type ListRoute = typeof list;

export const getOne = createRoute({
    tags,
    path: '/tasks/{id}',
    method: 'get',
    request: {
        params: IdParamsSchema,
    },
    responses: {
        [HttpStatusCode.OK]: jsonContent(
            selectTasksSchema,
            'The requested task'
        ),
        [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'Invalid id error'
        ),
        [HttpStatusCode.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
    },
});

export type GetOneRoute = typeof getOne;

export const create = createRoute({
    tags,
    path: '/tasks',
    method: 'post',
    request: {
        body: jsonContentRequired(insertTasksSchema, 'The task to create'),
    },
    responses: {
        [HttpStatusCode.OK]: jsonContent(insertTasksSchema, 'The created task'),
        [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTasksSchema),
            'The validation error(s)'
        ),
    },
});

export type CreateRoute = typeof create;

export const patch = createRoute({
    tags,
    path: '/tasks/{id}',
    method: 'patch',
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(patchTasksSchema, 'The task updates'),
    },
    responses: {
        [HttpStatusCode.OK]: jsonContent(patchTasksSchema, 'The updated task'),
        [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(patchTasksSchema).or(
                createErrorSchema(IdParamsSchema)
            ),
            'The validation error(s)'
        ),
        [HttpStatusCode.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
    },
});

export type PatchRoute = typeof patch;

export const remove = createRoute({
    tags,
    path: '/tasks/{id}',
    method: 'delete',
    request: {
        params: IdParamsSchema,
    },
    responses: {
        [HttpStatusCode.NO_CONTENT]: {
            description: 'Task deleted',
        },
        [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            'The validation error(s)'
        ),
        [HttpStatusCode.NOT_FOUND]: jsonContent(
            notFoundSchema,
            'Task not found'
        ),
    },
});

export type RemoveRoute = typeof remove;
