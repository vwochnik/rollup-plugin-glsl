var shader = (function () {
	'use strict';

	var basic = "import shaderSource from './shaders/basic.glsl';assert.equal(typeof shaderSource,'string');const lines=shaderSource.split(/\\n/);assert.equal(lines.length,4);assert.ok(/^#ifdef/.test(lines[0]));assert.ok(/^precision/.test(lines[1]));assert.ok(/^#endif/.test(lines[2]));assert.ok(/^attribute/.test(lines[3]));";

	return basic;

}());