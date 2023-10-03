import Router from '@koa/router';
import { Team } from '../db/models';

const team_router = new Router({ prefix: '/team' })

// find
team_router.get('/:id', async (ctx) => {
    const { id } = ctx.params
    const team = await Team.findOne({
        // attributes: {
        //     exclude: ['createdAt', 'updatedAt']
        // },
        where: { id },
        // raw: true
    })
    ctx.body = team
})

// add
team_router.post('/', async (ctx) => {
    const teaminfo = ctx.request.body as Team
    const team = await Team.create(teaminfo, { raw: true })
    ctx.body = team
})

// modify
team_router.put('/', async (ctx) => {
    const teaminfo = ctx.request.body as Team
    const team = await Team.findByPk(teaminfo.id)
    const res = await team?.update(teaminfo)
    ctx.body = res
})

// delete
team_router.delete('/:id', async (ctx, next) => {
    const { id } = ctx.params
    if (id === 'all') {
        return await next()
    }
    const res = await Team.destroy({ where: { id } })
    ctx.body = res
})

// delete all
team_router.delete('/all', async (ctx) => {
    const res = await Team.destroy({ truncate: true })
    ctx.body = res
})

export { team_router };
