const path = require("path");
const esbuild = require('esbuild');

async function run(filepath, data={}) {
    const {execa} = await import('execa');

    const result = await esbuild.build({
        entryPoints: ['utils/preact/shim.js'],
        bundle: true,
        format: "esm",
        platform: "node",
        external: ["preact", "preact-render-to-string"],
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        treeShaking: true,
        define: {
            '__import_file': `'../../${path.normalize(filepath)}'`,
            '__data': JSON.stringify(data)
        },
        write: false,
    });

    const res2 = await execa('node', [
        '--input-type=module',
        '--eval',
        result.outputFiles[0].text,
    ]);
    return res2.stdout;
}


module.exports = function PluginPreact(eleventyConfig, opts={}) {
    eleventyConfig.addWatchTarget("src/**/*.jsx");
    eleventyConfig.addWatchTarget("src/**/*.tsx");

    eleventyConfig.addAsyncShortcode('renderFile', async function(filepath, props) {
        return await run(filepath, props);
    });

    eleventyConfig.addAsyncShortcode('component', async function(filename, props) {
        return await run(`src/components/${filename}.jsx`, props);
    });
}
