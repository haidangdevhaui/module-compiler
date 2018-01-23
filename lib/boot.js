var { splitPath } = require('./helpers');
global.request = require('./request');
/**
 * map class to route
 * @param  {object} mapper
 * @return {void}
 */
module.exports = function(mapper) {
    var currentPath = window.location.pathname;
    var currentPathSplited = splitPath(currentPath);
    for (var key in mapper) {
        if (!/\/:\w+/.test(key) && key === currentPath) {
            global.request.route = key;
            return new mapper[key];
        }
        if (/\/:\w+/.test(key)) {
            var routeSplited = splitPath(key);
            if (currentPathSplited.length != routeSplited.length) {
                continue;
            }
            var pathItemPassed = 0;
            for (var i = 0; i < currentPathSplited.length; i++) {
                if (currentPathSplited[i] === routeSplited[i]) {
                    pathItemPassed++;
                } else if (/^:\w+$/.test(routeSplited[i])) {
                    global.request.params[routeSplited[i].replace(/:/g, '')] = currentPathSplited[i];
                    pathItemPassed++;
                }
            }
            if (pathItemPassed == currentPathSplited.length) {
                global.request.route = key;
                return new mapper[key];
            }
        }
    }
}