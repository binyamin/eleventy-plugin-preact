import {deserialize} from "node:v8";

import { h, Fragment } from 'preact';
import renderToString from 'preact-render-to-string';

const vNode = (await import(__import_file)).default;

const props = await (
    new Promise((resolve, reject) => {
        process.on("message", (message, _sendHandle) => {
            const m = deserialize(Buffer.from(message));
            if(m.name === 'props') resolve(m.value);
            else resolve({});
        });
    })
);

const htmlString = renderToString(h(vNode, Object.create(props)));

process.send(JSON.stringify({
    name: "html",
    value: htmlString
}));
