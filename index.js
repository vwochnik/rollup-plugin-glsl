import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string'

function compressShader(source) {
  let needNewline = false;
  return source.replace(/\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g, "").split(/\n+/).reduce((result, line) => {
    line = line.trim().replace(/\s{2,}|\t/, " ");
    if (line[0] === '#') {
      if (needNewline) {
        result.push("\n");
      }

      result.push(line, "\n");
      needNewline = false
    } else {
      result.push(line
        .replace(/\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|\-|!|;)\s*/g, "$1"))
      needNewline = true;
    }
    return result;
  }, []).join('').replace(/\n+/g, "\n");
}

function generateCode(source) {
	return `export default ${JSON.stringify(source)};`;
}

export default function glsl(options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'glsl',

		transform(source, id) {
			if (!filter(id)) return;

			const code = generateCode(compressShader(source)),
			      magicString = new MagicString(code);

			let result = { code: magicString.toString() };
      if (options.sourceMap !== false) {
        result.map = magicString.generateMap({ hires: true })
      }
      return result
		}
	};
}
glsl.compressShader = compressShader