import type { Middleware } from 'koa'
import routerMiddleware from '../routers'
import bodyParser from 'koa-bodyparser'


export default [
  bodyParser(),
  ...routerMiddleware,
] as Middleware[]