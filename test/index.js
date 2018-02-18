var assert = require('assert');
var { rollup } = require('rollup');
var glsl = require('../');
var fs = require('fs')

process.chdir('test');

function makeBundle(options) {
	options.plugins = [glsl({
		include: './**/*.glsl'
	})];
	return rollup(options);
}

describe('rollup-plugin-glsl', () => {
	it('should compress and convert imported GLSL shader', () => {
		return makeBundle({ entry: 'fixtures/basic.js' }).then(bundle => {
			const { code } = bundle.generate({ format: 'iife', moduleName: 'shader' });
			console.log(bundle.generate({ format: 'iife', moduleName: 'shader' }))
			fs.writeFileSync('./result/basic.bundle.js', code, 'utf8')
			new Function('assert', code)(assert);
			const expected = fs.readFileSync('./expected/basic.bundle.js')
			assert.equal(code, expected)
		});
	});
});