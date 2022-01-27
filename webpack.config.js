const path = require('path')
const NODE_ENV = process.env.NODE_ENV || "development";
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"dist")
    },
    watch: NODE_ENV,
    watchOptions: {
        aggregateTimeout: 500
    },

    module: {
        rules: [
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
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.cssoMinify,
                minimizerOptions: {restructure: false},
            }),
            new TerserPlugin(),
        ]
    },



}