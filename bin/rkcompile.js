#!/usr/bin/env node

global.Config = require('../lib/libraries').mergeConfig();
var webpack = require("webpack");
var program = require('commander');
var webpackConfig = require('../config/webpack');
var compiler = webpack(webpackConfig);
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
    if (Config.notify) {
        var message = Config.message.compilerSuccess;
        if (stats.hasErrors()) {
            message = Config.message.compilerError + stats.toString().substr(0, 300) + '...';
        }
        notifier(message);
    }
    console.log(stats.toString({
        colors: true,
        modules: numbOfCompiler == 1 ? true : false,
    }));
}
program.option('-f, --config_file', 'Running with other config file');
program.option('-m, --minifier', 'Minimize compiled files');
program.version('0.1.0').description('Rikkei module compiler');
program.command('watch').alias('w').description('Watch the filesystem for changes').action(function() {
    console.log('[watch] mode is running...');
    compiler.watch({}, compileCallback);
});
program.command('run').alias('r').description('Run a compiler').action(function() {
    console.log('[run] mode is running...');
    compiler.run(compileCallback);
});
program.parse(process.argv);