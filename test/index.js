var assert = require('assert');
var { rollup } = require('rollup');
var glsl = require('../');
var fs = require('fs')
var compressShader = glsl.compressShader

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

describe('compressFunction', () => {
	it('should work with \\\\\\n', () => {
		assert.equal(compressShader('uni\\\nform float f;'), 'uniform float f;');
	});
	it('should work with \\\\\\n\\r', () => {
		assert.equal(compressShader('uni\\\n\rform float f;'), 'uniform float f;');
	});
	it('should work with line comments', () => {
		assert.equal(compressShader('uniform float f; // foo'), 'uniform float f;');
	});
	it('should work with multiline comments', () => {
		assert.equal(compressShader('uniform/* c */ float f;'), 'uniform float f;');
	});
	it('should work with line comments containing \\\\\\r\\n', () => {
		assert.equal(compressShader('uniform float f;//\\\r\ngarbage'), 'uniform float f;');
	});
})