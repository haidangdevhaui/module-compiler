/**
 * core config
 * @author dangvh <dangvh@rikkeisoft.com>
 * @type {object}
 */
module.exports = {
    name: "Rikkei Module Compiler",
    message: {
        compilerSuccess: "Compiled successfully!",
        compilerError: "Compiled error!\n"
    },
    notify: true,
    webpack: {
        file: "module.config.json",
        entry: [],
        output: {
            script: "public/js/bundle.js",
            style: "public/css/styles.css"
        }
    }
}