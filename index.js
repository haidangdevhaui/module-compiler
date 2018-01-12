/**
 * package main
 * @author dangvh <dangvh@rikkeisoft.com>
 */
var webpack = require("webpack");
var notifier = require('node-notifier');
var webpackConfig = require('./config/webpack');
var compiler = webpack(webpackConfig);
var config = require('./lib/libraries').mergeConfig();
var numbOfCompiler = 0;
/* run compiler */
compiler.watch({}, function(err, stats) {
    numbOfCompiler ++;
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    const info = stats.toJson();
    if (config.notify) {
        var message = config.message.compilerSuccess;
        if (stats.hasErrors()) {
            message = config.message.compilerError + stats.toString().substr(0, 300) + '...';
        }
        notifier.notify({
            title: config.name,
            message: message
        });
    }
    console.log(stats.toString({
        colors: true,
        modules: numbOfCompiler == 1 ? true : false
    }));
});