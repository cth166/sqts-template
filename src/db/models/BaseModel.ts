import type { Optional } from 'sequelize';
import { Table, Model, BeforeUpdate, BeforeCreate, BeforeBulkUpdate, Column } from 'sequelize-typescript';

interface BaseAttributes {
    id?: number
}

interface BaseCreationAttributes extends Optional<BaseAttributes, 'id'> { }

@Table({
    timestamps: false
})
class BaseModel<
    TModelAttributes extends BaseAttributes = BaseAttributes,
    TCreationAttributes extends BaseCreationAttributes = Optional<TModelAttributes, 'id'>>
    extends Model<TModelAttributes, TCreationAttributes>
{

    @Column
    declare createdAt: number

    @Column
    declare updatedAt: number

    @BeforeCreate
    static set_createdAt(instance: any) {
        instance.createdAt = instance.updatedAt = Date.now()
    }

    @BeforeUpdate
    static set_updatedAt(instance: any) {
        instance.updatedAt = Date.now()
    }

    @BeforeBulkUpdate
    static set_bulk_updatedAt(options: any) {
        options.individualHooks = true;
    }

}

export { BaseModel }
