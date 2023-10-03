import Router from '@koa/router';
import { Movie, Actor } from '../db/models';

const actor_router = new Router({ prefix: '/actor' })

// find
actor_router.get('/:id', async (ctx) => {
    const { id } = ctx.params
    const actor = await Actor.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: Movie,
            required: true,
            through:{
                // an empty array. Because I don't need juction table record.
                attributes:[]
            }
        },
    })
    ctx.body = actor
})

// add
actor_router.post('/', async (ctx) => {
    const actorinfo = ctx.request.body as Actor
    const actor = await Actor.create(actorinfo)
    const isMovieEmpty =  !(!!(await Movie.findAll()).length)
    if(isMovieEmpty && actorinfo.name === 'benshan Zhao'){
        // const tmp_movie = await Movie.create({ name: 'suburban love story' })
        // await actor.$add('movie', tmp_movie)

        // 👆They're equivalent👇.The juction table add a record automatically.
        await actor.$create('movie', { name: 'suburban love story' })
    }
    ctx.body = actor
})

// modify
actor_router.put('/', async (ctx) => {
    const actorinfo = ctx.request.body as Actor
    const actor = await Actor.findByPk(actorinfo.id)
    const res = await actor?.update(actorinfo)
    ctx.body = res
})

// delete
actor_router.delete('/:id', async (ctx, next) => {
    const { id } = ctx.params
    if (id === 'all') {
        return await next()
    }
    const res = await Actor.destroy({ where: { id } })
    ctx.body = res
})

// delete all
actor_router.delete('/all', async (ctx) => {
    const res = await Actor.destroy({ truncate: true })
    ctx.body = res
})

export { actor_router };
