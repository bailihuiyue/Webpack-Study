const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
		tsx: './src/index.tsx',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			// lesson:5-3 配置ts的loader
			// 同时还需要一个tsconfig.json文件
			// tsconfig.json文件配置解释
			// {
			// 	"compilerOpitons": {
						//输出目录 如果在webpack.common中配置过output,可不写
			// 		"outDir": "./dist",
						// ts 使用的模块引入方式为es6(import)方式
			// 		"module": "es6",
						// 语法最终转换为es5
			// 		"target": "es5",
						// 允许ts中引入js模块
			// 		"allowJs": true,
			// 	}
			// }
			// ts加载纯js模块是出不来任何错误提示的,要想提示,需要另外安装ts模块,
			// npm install @types/lodash -D
			// 如何判断一个类库是否支持ts? https://microsoft.github.io/TypeSearch/ 输入名称查看
			// import * as _ from 'lodash';ts加载库不能直接import _ from ...,需要import * as _ from ...
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
	}
}