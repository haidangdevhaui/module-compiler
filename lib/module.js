/**
 * @author dangvh <dangvh@rikkeisoft.com>
 * abstract module
 * @description all module must be extends this class
 */
class Module {
    constructor() {
        if (new.target === Module) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        if (!this.boot) {
            throw '"boot" method is required.';
        }
        this.boot();
    }
}
module.exports = Module;