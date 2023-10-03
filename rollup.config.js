const { defineConfig } = require('rollup')
const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')

module.exports = defineConfig({
    input: 'src/index.ts',
    output: {
        file: './dist/bundle.js',
        format: "commonjs",
    },
    plugins: [
        typescript({
            module: 'esnext'
        }),
        terser()
    ],
    external: [/koa/, /sequelize/, /dotenv/]
});