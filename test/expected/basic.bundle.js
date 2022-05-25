(function () {
	'use strict';

	var shaderSource = "#ifdef GL_ES\nprecision highp float;\n#endif\nattribute vec3 aVertexPosition;attribute vec3 aVertexNormal;attribute vec2 aTextureCoord;attribute float aFace;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;uniform mat3 uNMatrix;varying vec2 vTextureCoord;varying vec3 vTransformedNormal;varying vec4 vPosition;varying float vFace;void main(void){vPosition=uMVMatrix*vec4(aVertexPosition,1.0);gl_Position=uPMatrix*vPosition;vTextureCoord=aTextureCoord;vTransformedNormal=uNMatrix*aVertexNormal;vFace=aFace;}float getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0 ? 0.0 : 3.0;else face=direction.y>0.0 ? 1.0 : 4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0 ? 2.0 : 5.0;else face=direction.y>0.0 ? 1.0 : 4.0;}return face;}";

	assert.equal(typeof shaderSource, 'string');
	const lines = shaderSource.split(/\n/);
	assert.equal(lines.length, 4);
	assert.ok(/^#ifdef/.test(lines[0]));
	assert.ok(/^precision/.test(lines[1]));
	assert.ok(/^#endif/.test(lines[2]));
	assert.ok(/^attribute/.test(lines[3]));

}());