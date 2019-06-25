const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	// devtool: 'cheap-module-eval-source-map',
	entry: {
		main: './src/index.js'
	},
	// lesson:5-4
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		// lesson:5-5让webpack支持pushState方式跳转路由
		// 原理:浏览器请求www.abc.com/a/b时,后端认为请求的是/a/b页面,当前端请求一个后端不存在的页面(地址)时,后端始终跳转请求到首页,
		// 前端框架收到/a/b的请求时,会自行处理,
		// historyApiFallback还有更多配置方法,比如rewrites,指定某种url返回某个html文件,默认都是只写个true
		historyApiFallback: true,
		proxy: {
			// devServer默认无法对/(根目录)进行转发,需要设置index:''
			// index:'',
			// 以/react/api/header.json为例
			// 拦截请求,发现请求url中包含/react/api,就转发到http://www.dell-lee.com
			'/react/api': {
				target: 'http://www.dell-lee.com',
				// 设置secure: false才能实现对https网址的请求转发
				secure: false,
				// 可以写方法,用于判断什么时候不转发,最后需要return 值,也可以是return false
				// bypass:function(){}
				// 发现请求url中包含header.json,就转发成demo.json
				// 更多详细配置:https://www.webpackjs.com/configuration/dev-server/#devserver-proxy
				pathRewrite: {
					'header.json': 'demo.json'
				},
				// 突破服务器对origin的限制,建议始终设置该选项
				changeOrigin: true,
				// 设置请求头
				headers: {
					host: 'www.dell-lee.com',
					cookie: ""
				}
			}
		}
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
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}