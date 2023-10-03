import Router from '@koa/router';
import { Movie } from '../db/models';

const movie_router = new Router({ prefix: '/movie' })

// find
movie_router.get('/:id', async (ctx) => {
    const { id } = ctx.params
    const movie = await Movie.findOne({
        // attributes: {
        //     exclude: ['createdAt', 'updatedAt']
        // },
        where: { id },
        // raw: true
    })
    ctx.body = movie
})

// add
movie_router.post('/', async (ctx) => {
    const movieinfo = ctx.request.body as Movie
    const movie = await Movie.create(movieinfo, { raw: true })
    ctx.body = movie
})

// modify
movie_router.put('/', async (ctx) => {
    const movieinfo = ctx.request.body as Movie
    const movie = await Movie.findByPk(movieinfo.id)
    const res = await movie?.update(movieinfo)
    ctx.body = res
})

// delete
movie_router.delete('/:id', async (ctx, next) => {
    const { id } = ctx.params
    if (id === 'all') {
        return await next()
    }
    const res = await Movie.destroy({ where: { id } })
    ctx.body = res
})

// delete all
movie_router.delete('/all', async (ctx) => {
    const res = await Movie.destroy({ truncate: true })
    ctx.body = res
})

export { movie_router };
