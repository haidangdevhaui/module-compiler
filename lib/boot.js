/**
 * map class to route
 * @param  {object} mapper
 * @return {void}
 */
// var splitPath = require('./splitPath');
var splitPath = require('./helpers').splitPath;

module.exports = function(mapper) {
    var path = window.location.pathname;

    var items = ['/user', '/user/1'];
    path = items[Math.floor(Math.random()*items.length)];

    var routeRegex = {};
    var routeNotRegex = {};
    for (var key in mapper) {
        if (/\/:\w+/.test(key)) {
            routeRegex[key] = mapper[key];
        } else {
            routeNotRegex[key] = mapper[key];
        }
    }
    for (var route in routeNotRegex) {
        if (route === path) {
            currentRoute = route;
            return new routeNotRegex[route];
        }
    }
    for (var route in routeRegex) {
        var arrayPath = splitPath(path);
        var arrayKey = splitPath(key);
        if (arrayPath.length != arrayKey.length) {
            continue;
        }
        var numbPassed = 0;
        for (var i = 0; i < arrayPath.length; i++) {
            if (arrayPath[i] === arrayKey[i] || /^:\w+$/.test(arrayKey[i])) {
                numbPassed++;
            }
        }
        if (numbPassed == arrayPath.length) {
            currentRoute = route;
            return new routeRegex[route];
        }
    }
}