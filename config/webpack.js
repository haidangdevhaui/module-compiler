/**
 * webpack config
 * @author dangvh <dangvh@rikkeisoft.com>
 * @type {object}
 */
var config = require('../lib/libraries').mergeConfig().webpack;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var MinifyPlugin = require("babel-minify-webpack-plugin");
var plugins = [
    new ExtractTextPlugin({
        allChunks: true,
        filename: config.output.style
    })
];
if (process.env.NODE_ENV == 'production') {
    plugins.push(new MinifyPlugin());
}
module.exports = {
    entry: config.entry,
    output: {
        filename: config.output.script
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }],
        rules: [{
            test: /\.s[ac]ss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: process.env.NODE_ENV == 'production' ? true : false
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        minimize: process.env.NODE_ENV == 'production' ? true : false
                    }
                }]
            })
        }]
    },
    plugins: plugins
};