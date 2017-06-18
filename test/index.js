var assert = require('assert');
var { rollup } = require('rollup');
var glsl = require('../');

process.chdir('test');

function makeBundle(options) {
	options.plugins = [glsl({})];
	return rollup(options);
}

describe('rollup-plugin-glsl', () => {
	it('should compress and convert imported GLSL shader', () => {
		return makeBundle({ entry: 'fixtures/basic.js' }).then(bundle => {
			const { code } = bundle.generate({ format: 'iife', moduleName: 'shader' });
			new Function('assert', code)(assert);
		});
	});
});
