# Rikkei Module Compiler
=========

ES6 syntax compiler for VanilarJS.<br/>
This is a package, not a framework.<br/>
Supported:
- Babel syntax.
- Async / Await.
- Sass.

## Installation

  `npm install -g @dangvh/rikkei-module-compiler`

## Configuration

   config entry end output in `module.config.json`
    
<pre><code>
{
    "entry": "resources/assets/js/app.js",
    "output": {
        "script": "",
        "style": ""
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

## Documentation
Get param `id`
<pre><code>
Import Mapper from 'rikkei-module-compiler'<br/>
Mapper.params.id
</code></pre>

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.