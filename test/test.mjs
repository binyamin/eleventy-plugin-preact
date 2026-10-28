import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import Eleventy from '@11ty/eleventy';

const root = (...rest) =>
    path.join(path.relative('.', import.meta.dirname), ...rest);

test('it renders to HTML', async () => {
    const elev = new Eleventy(root('stubs'), root('out'), {
        configPath: root('..', '.eleventy.js'),
    })

    const results = await elev.toJSON();

    assert.partialDeepStrictEqual(results, [
        {
            url: '/hello/',
            content: '<!DOCTYPE html><h1>Hello World</h1>'
        },
        {
            url: '/state/',
            content: '<!DOCTYPE html><div>2 * 3 = 6</div>'
        }
    ])
});
