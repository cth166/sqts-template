import Router from '@koa/router';
import { User } from '../db/models';

const user_router = new Router({ prefix: '/user' })

// find
user_router.get('/:id', async (ctx) => {
    const { id } = ctx.params
    const user = await User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: { id },
        // raw: true
    })
    ctx.body = user
})

// add
user_router.post('/', async (ctx) => {
    const userinfo = ctx.request.body as User
    const user = await User.create(userinfo)
    ctx.body = user
})

// modify
user_router.put('/', async (ctx) => {
    const userinfo = ctx.request.body as User
    const user = await User.findByPk(userinfo.id)
    const res = await user?.update(userinfo)
    ctx.body = res
})

// delete
user_router.delete('/:id', async (ctx, next) => {
    const { id } = ctx.params
    if (id === 'all') {
        return await next()
    }
    const res = await User.destroy({ where: { id } })
    ctx.body = res
})

// delete all
user_router.delete('/all', async (ctx) => {
    const res = await User.destroy({ truncate: true })
    ctx.body = res
})

export { user_router };
