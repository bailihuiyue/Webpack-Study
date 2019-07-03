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

// lesson:6-6
// 递归分析模块,生成依赖图谱
const makeDependenciesGraph = (entry) => {
	const entryModule = moduleAnalyser(entry);
	// graphArray是个一维数组
	const graphArray = [ entryModule ];
	for(let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencies } = item;
		if(dependencies) {
			for(let j in dependencies) {
				graphArray.push(
					moduleAnalyser(dependencies[j])
				);
			}
		}
	}
	const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		}
	});
	return graph;
}

const graghInfo = makeDependenciesGraph('./src/index.js');
console.log(graghInfo);

// lesson:6-7 创建最终要生成的代码,太复杂,没看
const generateCode = (entry) => {
	const graph = JSON.stringify(makeDependenciesGraph(entry));
	// 放在闭包里,避免污染全局环境
	// 递归执行,require,把require方法里需要的文件reqiure('./a.js')
	//这里的参数当做key,获取他的内容,然后继续执行
	return `
		(function(graph){
			// 翻译完成的代码中有require,exports关键字,浏览器中不存在这些方法,会报错,
			//因此需要自己实现这两个关键字
			function require(module) { 
				function localRequire(relativePath) {
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
}

const code = generateCode('./src/index.js');
console.log(code);