# Rikkei Module Compiler
=========

ES6 syntax compiler for VanilarJS.<br/>
This is a package, not a framework.<br/>
Supported:
- ES6 syntax.
- Babel syntax.
- Async / Await.
- Sass.

## Installation

  `npm install --save rikkei-module-compiler`

## Configuration

   The default config file is `module.config.json`.<br/>
   Full config:
<pre><code>
{
  // root path of compiled files, default is "public"
    "path": "public"<br/>
    // path to
    "publicPath": "/",<br/>
  // array|string file for compiled
    "entry": [
        "resources/assets/js/app.js",
        "resources/assets/sass/app.scss",
    ],<br/>
    // output file, direct without path
    "output": {
        "script": "js/bundle.js",
        "style": "css/styles.css"
    },<br/>
    // notifier enable|disable, default is true
    "notify": true
}
</code></pre>

## Usage
1.Create `resources/assets/js/user/index.js`
<pre><code>
import Module from 'rikkei-module-compiler'<br/>
export default class UserIndex extends Module {
    constructor() {
        super() //required for boot() method
    }<br/>
    /**
     * boot module (required)
     * @return {void}
     */
    boot() {}
}
</code></pre>

2.Create `resources/assets/js/module_mapper.js`
<pre><code>
import UserIndex from './user/index'
import UserDetail from './user/detail'<br/>
export default {
    '/user': UserIndex,
    '/user/:id': UserDetail
}
</code></pre>

3.Create `resources/assets/js/app.js`<br/>
<pre><code>
import Boot from 'rikkei-module-compiler'
import ModuleMapper from './module_mapper'<br/>
Boot(ModuleMapper)
</code></pre>

4.Run command `node_modules/.bin/rkcompile watch`<br/>
If you want to minifier compiled files, please run with `NODE_ENV=production`

## Options
- `-f|--config_file`:  Running with other config file.
- `-m|--minifier`: Minimize compiled files.
## Contributing