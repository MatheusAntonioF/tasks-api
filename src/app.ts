import { configureOpenApi } from './lib/configure-open-api';
import { createApp } from './lib/create-app';
import { indexRouter } from './routes/index.route';

export const app = createApp();

const routes = [indexRouter];

configureOpenApi(app);

routes.forEach(route => {
    app.route('/', route);
});

app.get('/', c => {
    return c.text('Hello Hono!');
});
