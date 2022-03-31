# [@binyamin/eleventy-preact](https://www.npmjs.com/package/@binyamin/eleventy-preact)
A personal [Eleventy](https://11ty.dev) plugin for rendering JSX/TSX as HTML, with [Preact](https://preactjs.com/).


## Usage
Add the plugin to your eleventy config, like so:
```js
const eleventyPreact = require("@binyamin/eleventy-preact");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPreact, {
        /* options */
    });
}
```


## Customization
- **doctype** (`boolean`) - Determines whether to add a doctype (`<!DOCTYPE HTML>`) before the rendered HTML. The doctype is never applied to JSX rendered via the shortcode.
- **shortcode** (`string` or `false`) - This will register a shortcode with the given name, which renders a JSX file in-place. Setting it to `false` disables the shortcode. The shortcode takes two parameters. The first is a file path, relative to the `includes` directory. The second is an object, passed as props.

These are the default options:
```yaml
{
    doctype: true,
    shortcode: "render_jsx"
}
```


## Contributing
All input is welcome; feel free to [open an issue](https://github.com/binyamin/eleventy-plugin-preact/issues/new). Please remember to be a [mensch](https://www.merriam-webster.com/dictionary/mensch). If you want to program, you can browse [the issue list](https://github.com/binyamin/eleventy-plugin-preact/issues).


## Legal
All source-code is provided under the terms of [the MIT license](https://github.com/binyamin/eleventy-plugin-preact/blob/main/LICENSE). Copyright 2022 Binyamin Aron Green.
