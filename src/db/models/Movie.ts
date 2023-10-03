import { Table, Column, BelongsToMany } from 'sequelize-typescript';
import { BaseModel } from './BaseModel'
import { ActorMovie } from './ActorMovie';
import { Actor } from './Actor';

interface MovieAttributes {
    id: number
    name: string
}

@Table({
    tableName: 'Movie'
})
class Movie extends BaseModel<MovieAttributes> {

    @Column
    declare name: string;

    @BelongsToMany(() => Actor, () => ActorMovie)
    declare actors?: Actor[]

}

export { Movie }
