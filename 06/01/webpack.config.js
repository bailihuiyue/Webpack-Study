const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	// 引入loaders时让webpack做一些事,比如指定loaders的位置
	resolveLoader: {
		modules: ['node_modules', './loaders']
	},
	module: {
		rules: [{
			test: /\.js/,
			use: [
				{
					loader: 'replaceLoader',
				},
				{
					loader: 'replaceLoaderAsync',
					options: {
						// loader可以传递参数
						// 在loader中使用this.query接收
						// this更多用法:https://webpack.js.org/api/loaders/#thisversion
						name: 'lee'
					}
				},
			]
		}]
	},
	plugins: [
		// lesson:6-3 插件的本质就是一个类,所以要new一下才能用
		new CopyRightWebpackPlugin({
			// 可以定义参数,在plugin的constructor中接收
			name:"dell lee"
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}