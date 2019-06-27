const path = require('path');

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
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
}