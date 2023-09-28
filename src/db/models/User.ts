import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from './BaseModel'

interface UserAttributes {
    id: number
    username: string
    password: string
}

@Table({
    tableName: 'User'
})
class User extends BaseModel<UserAttributes> {

    @Column(DataType.STRING)
    declare username: string;

    @Column(DataType.STRING)
    declare password: string;

}

export { User }
