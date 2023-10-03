import { Table, Column } from 'sequelize-typescript';
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

    @Column
    declare username: string

    @Column
    declare password: string

}

export { User }
