const webpack = require('webpack');
//lesson:4-2 webpack-merge该插件需要安装
// const merge = require('webpack-merge');
// const commonConfig = require('./webpack.common.js');
const path = require('path');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	// lesson:4-9 移入到webpack.common.js
	// optimization: {
	// 	usedExports: true
	// },
	module: {
		rules: [
			{
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
					// 'postcss-loader'
				]
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					// 'postcss-loader'
				]
			}
		]
	},
	// lesson 4-10
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}

//lesson:4-2合并配置文件 
// module.exports = merge(commonConfig, devConfig);

// lesson:4-12
module.exports = devConfig;