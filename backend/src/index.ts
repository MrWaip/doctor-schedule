import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { ApiRoutes } from './routes';
import koaLogger from 'koa-logger';
import cors from '@koa/cors';

createConnection()
  .then(async () => {
    const app = new Koa();
    const router = new Router({ prefix: '/api' });

    ApiRoutes.forEach((route) => router[route.method](route.path, route.action));

    app.use(bodyParser());
    app.use(cors());
    app.use(koaLogger());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);

    console.log('Koa application is up and running on port 3000');
  })
  .catch((error) => console.log(error));
