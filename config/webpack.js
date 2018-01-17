const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const config = require('../lib/libraries').mergeConfig().webpack;

// start config
module.exports = [{
    entry: config.entry,
    output: {
        path: config.path,
        filename: config.output.script,
        publicPath: config.publicPath,
    },
    module: {
        loaders: [

            // js compiler rule
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },

            // css compiler rule
            {
                test: /\.(s[ac]ss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader!sass-loader!resolve-url-loader!sass-loader?sourceMap&sourceComments&minimize'
                })
            },

            // font compiler rule
            {
                test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (! /node_modules|bower_components/.test(path)) {
                            return config.fontDirOutput + '/[name].[ext]?[hash]';
                        }

                        return config.fontDirOutput + '/vendor/' + path
                            .replace(/\\/g, '/')
                            .replace(
                                /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                            ) + '?[hash]';
                    },
                    publicPath: config.publicPath
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
                                    return config.imageDirOutput + '/[name].[ext]?[hash]';
                                }
                                return config.imageDirOutput + '/vendor/' + path
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                    ) + '?[hash]';
                            },
                            publicPath: config.publicPath
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
    plugins: [
        new ExtractTextPlugin(config.output.style),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'PUBLIC_PATH': JSON.stringify(config.publicPath)
            }
        }),
        new MinifyPlugin()
    ]
}]