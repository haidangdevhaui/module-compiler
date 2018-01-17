var config = require('../config/config');
var path = require('path');
var fs = require('fs');
var notifier = require('node-notifier');
/**
 * merge core config with custom config
 * @author dangvh <dangvh@rikkeisoft.com>
 * @type {function}
 */
exports.mergeConfig = function() {
    var rootPath = process.cwd();
    if (fs.existsSync(config.webpack.file)) {
        try {
            configReaded = JSON.parse(fs.readFileSync(config.webpack.file).toString());

            //entry option
            if (!configReaded.entry) {
                throw 'Missing entry in config.';
            }
            if (typeof configReaded.entry == "string") {
                config.webpack.entry.push(path.join(rootPath, configReaded.entry));
            }
            if (typeof configReaded.entry == "object") {
                for (var i = 0; i < configReaded.entry.length; i++) {
                    config.webpack.entry.push(path.join(rootPath, configReaded.entry[i]));
                }
            }

            // output option
            if (configReaded.output) {
                if (configReaded.output.script) {
                    config.webpack.output.script = configReaded.output.script;
                }
                if (configReaded.output.style) {
                    config.webpack.output.style = configReaded.output.style;
                }
            }

            // notifier option
            if (configReaded.notify === false) {
                config.notify = false;
            }

            // compiler dir
            if (configReaded.path) {
                config.webpack.path = path.join(rootPath, configReaded.path);
            } else {
                config.webpack.path = path.join(rootPath, config.webpack.path);
            }
        } catch (e) {
            throw 'Error reading config.';
        }
    }
    return config;
}
/**
 * push notification when compiled
 * @param {string} title
 * @param {string} content
 * @return {void}
 */
exports.pushNotify = function(message) {
    return notifier.notify({
        title: config.name,
        message: message,
        icon: path.join(__dirname, 'icon.jpg')
    });
}