import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { ApiRoutes } from './routes';
import * as koaLogger from 'koa-logger';

createConnection()
  .then(async () => {
    const app = new Koa();
    const router = new Router({ prefix: '/api' });

    ApiRoutes.forEach((route) => router[route.method](route.path, route.action));

    app.use(bodyParser());
    app.use(koaLogger());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3080);

    console.log('Koa application is up and running on port 3080');
  })
  .catch((error) => console.log(error));
