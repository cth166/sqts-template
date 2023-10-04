# sqts-testdemo

A node backend template.

 **A sqts-template with more examples. **

**One-To-Many and Many-To-Many associations in models, and lazy loading in routers.**

**If you are confused with Sequelize-Typescript or Sequelize, you can start with this demo.** 

 Also you can compare this demo with  [**official example**.](https://github.com/RobinBuschmann/sequelize-typescript-example) 



## Install

```bash
pnpm i
```



## Usage

You can get more "scripts" in  `package.json`.

**NOTE:** You should always provide a table name, unless you modify the terser options in `rollup.config.js`.

For example:

```js
terser({
    mangle:false,
    keep_classnames:true
})
```



## Configuration

Configurations is in `src/env`.

Initially, I provide two environment for you. Of course,  you can add for your convenience. For instance, `.env.test`.

