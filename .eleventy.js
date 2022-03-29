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