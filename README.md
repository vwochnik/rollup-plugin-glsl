# rollup-plugin-glsl [![Build Status](https://travis-ci.org/vwochnik/rollup-plugin-glsl.svg)](https://travis-ci.org/vwochnik/rollup-plugin-glsl)

> Converts GLSL shader source files to modules

```js
import fragmentShaderSource from './fragment.glsl';
console.log(`Fragment shader source: ${fragmentShaderSource}`);
```

## Installation

```sh
npm i rollup-plugin-glsl -D
```

## Usage

```js
import { rollup } from 'rollup';
import glsl from 'rollup-plugin-glsl';

rollup({
	entry: 'main.js',
	plugins: [
		glsl({
			// By default, everything gets included
			include: 'lib/**/*.glsl',

			// Undefined by default
			exclude: ['**/index.html'],

			// Source maps are on by default
			sourceMap: false
		})
	]
});
```

# License

MIT
