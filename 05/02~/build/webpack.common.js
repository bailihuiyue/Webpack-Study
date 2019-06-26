const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
		tsx: './src/index.tsx',
	},
	resolve: {
		// lesson:5-9 很多时候import Home from './home'并不需要写扩展名,这就是靠extensions实现的,
		// webpack会自动按照extensions去拼接文件然后查找是否存在,比如home会依次查找home.js,home.jsx
		// 配多了会卡,因为总得找
		extensions: ['.js', '.jsx'],
		//有时候只需要引文件到文件夹级别,就可以自动找到里面的index.js或者其他,就是利用mainFiles实现的
		mainFiles:['index','child'],
		// 别名 import Home from 'hehe',如果直接引入hehe,那么会查找../src/a/b/c/child下面的文件
		alias: {
			hehe: path.resolve(__dirname, '../src/a/b/c/child')
		}
	},
	module: {
		rules: [{
			// lesson:5-9 ?表示前面的字符可有可无
			test: /\.jsx?$/,
			// exclude: /node_modules/,
			// lesson:5-8也可以写成include
			// include,exclude一般只适用于js,像图片之类的就不需要了,因为所有的图片都需要打包到dist下
			include: path.resolve(__dirname, '../src'),
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