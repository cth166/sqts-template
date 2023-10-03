import { Table, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel'
import { Team } from './Team'

interface PlayerAttributes {
    id: number
    name: string
}

@Table({
    tableName: 'Player'
})
class Player extends BaseModel<PlayerAttributes> {

    @Column
    declare name: string

    @ForeignKey(() => Team)
    @Column
    declare teamId: number

    @BelongsTo(() => Team)
    declare team: Team

}

export { Player }
