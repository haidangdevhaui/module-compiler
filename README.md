# Rikkei Module Compiler
=========

ES6 syntax compiler for VanilarJS.<br/>
This is a package, not a framework.<br/>
Supported:
- Babel syntax.
- Async / Await.
- Sass.

## Installation

  `npm install -g rikkei-module-compiler`

## Configuration

   config entry end output in `module.config.json`
    
<pre><code>
{
    "entry": [
        "resources/assets/js/app.js",
        "resources/assets/sass/app.scss",
    ],
    "output": {
        "script": "public/js/bundle.js",
        "style": "public/css/styles.css"
    }
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
Import Boot from 'rikkei-module-compiler'
Import ModuleMapper from './module_mapper'<br/>
Boot(ModuleMapper)
</code></pre>

4.Run command `rkcompile watch`

## Documentation
## Contributing