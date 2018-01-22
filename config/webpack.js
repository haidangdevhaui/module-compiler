const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const styleOptions = {
    minimize: Config.webpack.minifier,
    sourceMap: true,
    sourceComments: true
}

var plugins = [];

// adding extract text plugin
plugins.push(new ExtractTextPlugin(Config.webpack.output.style));

// webpack env defined
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PUBLIC_PATH': JSON.stringify(Config.webpack.publicPath)
    }
}));

// if minifier option
Config.webpack.minifier ? plugins.push(new MinifyPlugin()) : '';

// start webpack config
module.exports = [{
    entry: Config.webpack.entry,
    output: {
        path: Config.webpack.path,
        filename: Config.webpack.output.script,
        publicPath: Config.webpack.publicPath,
    },
    module: {
        loaders: [

            // js compiler rule
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            // css compiler rule
            {
                test: /\.(s[ac]ss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: styleOptions
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: styleOptions
                    }]
                })
            },

            // font compiler rule
            {
                test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (! /node_modules|bower_components/.test(path)) {
                            return Config.webpack.fontDirOutput + '/[name].[ext]?[hash]';
                        }

                        return Config.webpack.fontDirOutput + '/vendor/' + path
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                            ) + '?[hash]';
                    },
                    publicPath: Config.webpack.publicPath
                }
            },

            // image compiler rule
            {
                test:  /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (! /node_modules|bower_components/.test(path)) {
                                    return Config.webpack.imageDirOutput + '/[name].[ext]?[hash]';
                                }
                                return Config.webpack.imageDirOutput + '/vendor/' + path
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                    ) + '?[hash]';
                            },
                            publicPath: Config.webpack.publicPath
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
}]