/**
 * core config
 * @author dangvh <dangvh@rikkeisoft.com>
 * @type {object}
 */
module.exports = {

    // env
    envType: 'development',

    // package name
    name: "Rikkei Module Compiler",

    // message compiled
    message: {
        compilerSuccess: "Compiled successfully!",
        compilerError: "Compiled error!\n"
    },

    // notify enable
    notify: true,


    // webpack config
    webpack: {

        // config file
        file: "module.config.json",

        // path
        path: "public",

        // public path for assets
        publicPath: "/",

        // font output dir
        fontDirOutput: "fonts",

        // images output dir
        imageDirOutput: "images",

        // input file
        entry: [],

        // output file
        output: {

            // js file
            script: "js/bundle.js",

            // css file
            style: "css/styles.css"
        }
    }
}