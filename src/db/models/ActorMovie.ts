import { Table, Column, ForeignKey, Model } from 'sequelize-typescript';
import { Actor } from './Actor';
import { Movie } from './Movie';


@Table({
    tableName: 'ActorMovie'
})
class ActorMovie extends Model {

    @ForeignKey(() => Actor)
    @Column
    declare actorId: number;

    @ForeignKey(() => Movie)
    @Column
    declare movieId: number;

}

export { ActorMovie }
