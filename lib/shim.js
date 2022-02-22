import 'preact/devtools';

import { h, Fragment } from 'preact';
import {renderToString} from 'preact-render-to-string';

const vNode = (await import(__import_file)).default;
const s = renderToString(h(vNode, __data));
console.log(s); // Important
