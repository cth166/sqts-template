import type { Optional } from 'sequelize';
import { Table, Model } from 'sequelize-typescript';

interface BaseAttributes {
    id?: number
}

interface BaseCreationAttributes extends Optional<BaseAttributes, 'id'> { }

@Table
class BaseModel<
    TModelAttributes extends BaseAttributes,
    TCreationAttributes extends BaseCreationAttributes = Optional<TModelAttributes, 'id'>>
    extends Model<TModelAttributes, TCreationAttributes>
{


}

export { BaseModel }
