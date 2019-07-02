// lesson:6-4 npm install cli-highlight -g 可以让控制台有颜色标识
// node bundler.js | highlight 运行后就有高亮标识了
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 自制的模块打包工具起名叫做moduleAnalyser
const moduleAnalyser = (filename) => {
	// 首先用node读取文件
	const content = fs.readFileSync(filename, 'utf-8');
	// 使用@babel/parser转换成ast语法树
	const ast = parser.parse(content, {
		sourceType: 'module' //默认写法
	});
	const dependencies = {};
	// 使用@babel/traverse操作语法树
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile;
		}
	});
	const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"]
	});
	return {
		filename,
		dependencies,
		code
	}
}

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);
