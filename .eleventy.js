const path = require("path");
const render = require("./lib/render.js");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @param {object} configGlobalOptions
 * @param {boolean} [configGlobalOptions.doctype=false]
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function EleventyPreact(eleventyConfig, configGlobalOptions = {}) {
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

                if(configGlobalOptions.doctype) {
                    htmlString = '<!DOCTYPE html>' + htmlString;
                }

                return htmlString;
            }
        }
    }

    eleventyConfig.addAsyncShortcode("renderFile", async function(filepath, props) {
        const d = path.resolve(path.dirname(this.page.inputPath));
        return await render(path.join(d, filepath), props);
    })

    eleventyConfig.addExtension("jsx", extConfig);
    eleventyConfig.addExtension("tsx", extConfig);
}
