import { Sequelize } from 'sequelize-typescript';
import * as allModels from './models'


const models = Object.entries(allModels).map(([_, model]) => model)


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
    models
});
// testdemo
export default sequelize
