const path = require('path')
const NODE_ENV = process.env.NODE_ENV || "development";
const HTMLWebPackPlugin = require('html-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"dist")
    },
    watchOptions: {
        aggregateTimeout: 500
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'pug-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: "> 3%" // можно и указать конкретные браузеры
                                }
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {injectType: 'singletonStyleTag'},
                    },
                    {
                        loader: 'css-loader',
                        options: {url: false},
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: './src/view/index.html',
        })
        ]
}