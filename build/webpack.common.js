const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			}
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			}
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	// lesson:4-4
	optimization: {
		splitChunks: {
			// 要做代码分割,类库单独打包成一个文件
			// 用于同步引入的代码分割(文件头一行写的import),
			// 动态引入(function中import('...'))的文件,webpack会自动分割,打包成一个单独的文件,无需配置

			// 代码分割，和webpack无关
			// webpack中实现代码分割，两种方式
			// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
			// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
			chunks: 'all',
		}
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}