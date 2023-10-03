import Router from '@koa/router';
import { Player,Team } from '../db/models';

const player_router = new Router({ prefix: '/player' })

// find
player_router.get('/:id', async (ctx) => {
    const { id } = ctx.params
    const player = await Player.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { id },
        // raw: true
    })
    const team = await player?.$get('team')

    ctx.body = Object.assign(player?.toJSON() ?? {}, { team: team?.toJSON() })
})

// add
player_router.post('/', async (ctx) => {
    const playerinfo = ctx.request.body as Player
    const player = await Player.create(playerinfo, { raw: true })
    // if doesn't recieve a teamId
    if (!playerinfo.teamId) {
        const default_team = await Team.findByPk(1)
        player!.$set('team', default_team)
    }
    ctx.body = player
})

// modify
player_router.put('/', async (ctx) => {
    const playerinfo = ctx.request.body as Player
    const player = await Player.findByPk(playerinfo.id)
    const res = await player?.update(playerinfo)
    ctx.body = res
})

// delete
player_router.delete('/:id', async (ctx, next) => {
    const { id } = ctx.params
    if (id === 'all') {
        return await next()
    }
    const res = await Player.destroy({ where: { id } })
    ctx.body = res
})

// delete all
player_router.delete('/all', async (ctx) => {
    const res = await Player.destroy({ truncate: true })
    ctx.body = res
})

export { player_router };
