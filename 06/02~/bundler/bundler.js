// lesson:6-4 npm install cli-highlight -g 可以让控制台有颜色标识
// node bundler.js | highlight 运行后就有高亮标识了
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// 内部使用了export default,因此需要要加个.default才能使用
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
		// 抽象语法树的type都有一个对应的方法来调用,{node}表示过滤出的对应的节点
		// 比如ImportDeclaration()中的node过滤出来的都是type:ImportDeclaration的节点
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile;
		}
	});
	// 将抽象语法树转换成浏览器可以运行的代码,参数:(ast代码,code,用啥转换)
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
