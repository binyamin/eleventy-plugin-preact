const { serialize } = require("v8");
const path = require("path");
const esbuild = require('esbuild');

/**
 * Given a JSX file, return equivalent HTML
 *
 * @param {string} filepath path to the JSX file
 * @param {any} [props={}] Global data to pass to the file
 * @returns {Promise<string>} HTML content
 */
async function render(filepath, props={}) {
    const {execa} = await import('execa');

    const import_file = path.resolve(__dirname, path.normalize(filepath));

    const result = await esbuild.build({
        entryPoints: [path.resolve(__dirname, 'shim.js')],
        bundle: true,
        format: "esm",
        platform: "node",
        external: ["preact", "preact-render-to-string"],
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        treeShaking: true,
        define: {
            __import_file: `'${import_file}'`
        },
        write: false,
    });

    const res2 = execa('node', [
        '--input-type=module',
        '--eval',
        result.outputFiles[0].text,
    ], {
        stdout: 'inherit',
        stderr: 'inherit',
        stdin: 'ipc'
    });

    res2.send(serialize({
        name: "props",
        value: props
    }));

    const htmlString = await new Promise((resolve, reject) => {
        res2.on("message", (message, _sendHandle) => {
            const m = JSON.parse(message);
            if(m.name === 'html') {
                resolve(m.value);
            }
        })
    });

    res2.disconnect();
    // await res2; // Does this do anything?

    return htmlString;
}

module.exports = render;
