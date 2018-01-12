/**
 * split path
 * @param  {string} path 
 * @return {array}
 */
exports.splitPath = function(path) {
    if (typeof path != "string") {
        return [];
    }
    return path.split('/').filter(function(item) {
        return item != "" && item != undefined && item != null;
    });
}