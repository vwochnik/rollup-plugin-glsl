(function () {
	'use strict';

	var shaderSource = "#ifdef GL_ES\nprecision highp float;\n#endif\nattribute vec3 aVertexPosition;attribute vec3 aVertexNormal;attribute vec2 aTextureCoord;attribute float aFace;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;uniform mat3 uNMatrix;varying vec2 vTextureCoord;varying vec3 vTransformedNormal;varying vec4 vPosition;varying float vFace;void main(void){vPosition=uMVMatrix*vec4(aVertexPosition,1.0);gl_Position=uPMatrix*vPosition;vTextureCoord=aTextureCoord;vTransformedNormal=uNMatrix*aVertexNormal;vFace=aFace;}";

	assert.equal(typeof shaderSource, 'string');
	const lines = shaderSource.split(/\n/);
	assert.equal(lines.length, 4);
	assert.ok(/^#ifdef/.test(lines[0]));
	assert.ok(/^precision/.test(lines[1]));
	assert.ok(/^#endif/.test(lines[2]));
	assert.ok(/^attribute/.test(lines[3]));

}());