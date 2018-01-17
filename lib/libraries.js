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
    // get options
    var options = this.getOption();

    // select config file
    var configFile = config.webpack.file;
    if (options.config_file) {
        configFile = options.config_file;
    }

    if (fs.existsSync(configFile)) {
        try {
            configReaded = JSON.parse(fs.readFileSync(configFile).toString());

            //entry option
            if (!configReaded.entry) {
                throw 'Missing entry config.';
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
                config.webpack.publicPath = configReaded.path.replace(/^\w+/g, '') + '/';
            } else {
                config.webpack.path = path.join(rootPath, config.webpack.path);
            }

            // minifier
            if (options.minifier) {
                config.webpack.minifier = true;
            }
        } catch (e) {
            throw 'Error reading config';
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

/**
 * get option from argument node
 * @return {object}
 */
exports.getOption = function() {
    var argvOption = process.argv.filter(function(item) {
        return /^--/g.test(item);
    });
    var options = {};
    for (var i = 0; i < argvOption.length; i++) {
        var item = argvOption[i].replace(/-/g, '').split('=');
        if (item.length == 1) {
            item.push(true);
        }
        options[item[0]] = item[1];
    }
    return options;
}