import Router from '@koa/router';
import * as routers from './subRouters';

const api = new Router({ prefix: '/api' });

for (const [_, router] of Object.entries(routers)) {
    api.use('', router.routes(), router.allowedMethods())
}

api.get('/', ctx => {
    ctx.body = '对吗？'
})

export default [api.routes(), api.allowedMethods()]