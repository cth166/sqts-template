import { Table, Column, BelongsToMany } from 'sequelize-typescript';
import { BaseModel } from './BaseModel'
import { ActorMovie } from './ActorMovie';
import { Movie } from './Movie';

interface ActorAttributes {
    id: number
    name: string
}

@Table({
    tableName: 'Actor'
})
class Actor extends BaseModel<ActorAttributes> {

    @Column
    declare name: string

    @BelongsToMany(() => Movie, () => ActorMovie)
    declare movies?: Movie[]

}

export { Actor }
