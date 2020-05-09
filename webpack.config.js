const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/'},
            {test: /phaser\.js$/, loader: 'expose-loader?Phaser'},
            {test: /\.css$/i, use: ['style-loader', 'css-loader']}
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),
        host: '127.0.0.1',
        port: 8080,
        open: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: phaser
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new CopyPlugin([
            { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
            { from: path.resolve(__dirname, 'index.html'), to: 'index.html' },
        ]),
    ],
};
