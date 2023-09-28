import Koa from 'koa'
import middlewares from './middleware'
import sequelize from './db'
import * as dotenv from 'dotenv'

// load env
dotenv.config()


sequelize.sync()

const app = new Koa();

for (const mv of middlewares) {
    app.use(mv)
}

app.listen(process.env.APP_PORT, () => {
    console.log(`running at Port ${process.env.APP_PORT}`);
})
