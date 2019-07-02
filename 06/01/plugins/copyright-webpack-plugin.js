// lesson:6-3

// "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"
// 显示的执行node_modules/webpack/bin/webpack.js和执行webpack一样,但是显示执行可以添加参数
//  --inspect表示执行调试模式--inspect-brk表示第一行打断点
// npm run debug之后可以在浏览器中调试,直接任意窗口f12点击node图标即可

class CopyrightWebpackPlugin {
	//接收插件传来的参数
	constructor(options) {
		console.log(options);
	}

	apply(compiler) {
		// compiler包含了webpack的实例
		// 具体看https://webpack.js.org/api/compiler-hooks/#hooks
		//tapAsync第一个参数传插件名字,第二个传回调
		//emit时刻,异步
		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			// 可以使用node调试工具打断点
			debugger;
			// assets里包含了本次要写入的文件,,想增加文件的话,再添加一个就行了
			compilation.assets['copyright.txt'] = {
				// 内容
				source: function () {
					return 'copyright by dell lee'
				},
				// 告诉插件他的大小
				size: function () {
					return 21;
				}
			};
			// 使用tapAsync之后一定要带一个cb()
			cb();
		})

		// 同步使用tap就可以了
		compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('compiler');
		})
	}

}

module.exports = CopyrightWebpackPlugin;