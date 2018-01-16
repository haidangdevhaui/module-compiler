#!/usr/bin/env node

var webpack = require("webpack");
var program = require('commander');
var webpackConfig = require('../config/webpack');
var compiler = webpack(webpackConfig);
var config = require('../lib/libraries').mergeConfig();
var notifier = require('../lib/libraries').pushNotify;
var numbOfCompiler = 0;
var compileCallback = function(err, stats) {
    numbOfCompiler++;
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
        notifier(message);
    }
    console.log(stats.toString({
        colors: true,
        modules: numbOfCompiler == 1 ? true : false
    }));
}
program.version('0.1.0').description('Rikkei module compiler');
program.command('watch').alias('w').description('Watch the filesystem for changes').action(function() {
    compiler.watch({}, compileCallback);
});
program.command('run').alias('r').description('Run a compiler').action(function() {
    compiler.run(compileCallback);
});
program.parse(process.argv);