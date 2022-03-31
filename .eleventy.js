const path = require("path");
const render = require("./lib/render.js");

/**
 * @typedef {import("@11ty/eleventy/src/UserConfig")} EleventyConfig
 */

/**
 * @param {EleventyConfig} eleventyConfig
 * @param {object} [options]
 * @param {boolean} [options.doctype=true] Whether to add a doctype for standalone preact files (default: `true`)
 * @param {string|false} [options.shortcode="render_jsx"]  Unless set to `false`,
 * add a shortcode with the given name. Default name is "render_jsx". The shortcode renders the given
 * file, relative to the `includes` directory, with the given props.
 */
function EleventyPreact(eleventyConfig, options = {}) {
    options = Object.assign({
        doctype: true,
        shortcode: "render_jsx"
    }, options);
    if(options.shortcode === true) options.shortcode = "render_jsx";

    eleventyConfig.addTemplateFormats("jsx");
    eleventyConfig.addTemplateFormats("tsx");

    const extConfig = {
        outputFileExtension: "html",
        read: false,
        compile(inputContent, inputPath) {
            return async function(data) {
                /*
                  We can't pass `collections` or `eleventyComputed`
                  as props.

                  TL;DR - With the way we render the JSX, we
                  get an error for those objects.

                  Why?
                  The way we render the JSX, we spawn a node.js
                  script, and send the props to that process
                  in real-time, via a cool feature called an
                  "IPC channel".
                  We serialize the props before sending them,
                  using the native v8 module. It refuses to
                  serialize `collections` and `eleventyComputed`.
                  This may be because of circular references.
                */
                const {
                    collections,
                    eleventyComputed,
                    ...props
                } = data;

                let htmlString = await render(path.resolve(inputPath), props);

                if(options.doctype) {
                    htmlString = '<!DOCTYPE html>' + htmlString;
                }

                return htmlString;
            }
        }
    }

    if(options.shortcode !== false) {
        eleventyConfig.addAsyncShortcode(options.shortcode, async function(filepath, props) {
           const includes_dir = path.join(
                this.ctx.eleventy.env.root,
                eleventyConfig.dir.input,
                eleventyConfig.dir.includes
            );

            return await render(path.join(includes_dir, filepath), props);
        })
    }

    eleventyConfig.addExtension("jsx", extConfig);
    eleventyConfig.addExtension("tsx", extConfig);
}

module.exports = EleventyPreact;
