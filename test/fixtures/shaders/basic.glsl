#ifdef GL_ES
precision highp float;
#endif

// shader attributes
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute float aFace;

// shader uniforms
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying float vFace;

void main(void) {
  vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
  gl_Position = uPMatrix * vPosition;
  vTextureCoord = aTextureCoord;
  vTransformedNormal = uNMatrix * aVertexNormal;
  vFace = aFace;
}

// Copied from ThreeJS (else without curly braces)
float getFace( vec3 direction ) {
	vec3 absDirection = abs( direction );
	float face = - 1.0;
	if ( absDirection.x > absDirection.z ) {
		if ( absDirection.x > absDirection.y )
			face = direction.x > 0.0 ? 0.0 : 3.0;
		else
			face = direction.y > 0.0 ? 1.0 : 4.0;
	} else {
		if ( absDirection.z > absDirection.y )
			face = direction.z > 0.0 ? 2.0 : 5.0;
		else
			face = direction.y > 0.0 ? 1.0 : 4.0;
	}
	return face;
}