# sqts-template

A node backend template.

 **This is just an instructional template for beimi-scada **.

**The biggest significance of this project is serving as a initial template for `cth-cli`.**

**I use space 4 indentation, of course, it’s also very opinionated towards my needs.** 



## choose to use `Sequelize-Typescript` over `Sequelize`

While `Sequelize5.X` has already added TypeScript support, It will make you upset when you want to use [**mixins**.](https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances) In other words, if you organize your each model in a separate file.  you can only use half of mixins because of the circular reference.  When the associations are complex, It's unrealistic to put so many models in only one `.js/.ts` file.

`Sequelize-Typescript` resolved this problem by using a getter function. And just a slight change in writing in  [**lazy loading**.](https://sequelize.org/docs/v6/core-concepts/assocs/#fetching-associations---eager-loading-vs-lazy-loading) 

**In Sequelize(bad error)**

```js
// db/models/Captain.ts
import Ship from './Ship';
Captain.hasMany(Ship, { foreignKey: 'captainId' })

// db/models/Ship.ts
import Captain from './Captain';
Ship.belongsTo(Captain) //circular reference will cause unexpected problems. The code will throw errors.
```

You can only use either `ship.getCaptain()` or `captain.getShips()`, in order that the code runs with no error.

**Sequelize-Typescript(good)**

```js
// db/models/Player.ts
@Table({
    tableName: 'Player'
})
class Player extends BaseModel<PlayerAttributes> {

    @Column(DataType.STRING)
    declare name: string;

    @ForeignKey(() => Team)
    @Column
    declare teamId: number;

    @BelongsTo(() => Team)
    declare team: Team
}

// db/models/Team.ts
@Table({
    tableName: 'Team'
})
class Team extends BaseModel<TeamAttributes> {

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Player)
    declare players: Player[]
}
```

Both `team.$get('players')` and `player.$get('team')` are fine.

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

