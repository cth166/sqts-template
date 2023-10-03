import { Table, Column, HasMany } from 'sequelize-typescript';
import { BaseModel } from './BaseModel'
import { Player } from './Player';

interface TeamAttributes {
    id: number
    name: string
}

@Table({
    tableName: 'Team'
})
class Team extends BaseModel<TeamAttributes> {

    @Column
    declare name: string

    @HasMany(() => Player)
    declare players: Player[]

}

export { Team }
