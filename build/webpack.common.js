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
		},
			// lesson:4-9 已移入webpack.dev.js
			// {
			// 	test: /\.scss$/,
			// 	use: [
			// 		'style-loader',
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2
			// 			}
			// 		},
			// 		'sass-loader',
			// 		'postcss-loader'
			// 	]
			// }, {
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader',
			// 		'postcss-loader'
			// 	]
			// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	// lesson:4-4
	optimization: {
		usedExports: true,
		// 用来做代码分割,不写的话也有默认值的
		splitChunks: {
			// 要做代码分割,类库单独打包成一个文件
			// 用于同步引入的代码分割(文件头一行写的import),
			// 动态引入(function中import('...'))的文件,webpack会自动分割,打包成一个单独的文件,无需配置

			// 代码分割，和webpack无关
			// webpack中实现代码分割，两种方式
			// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
			// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
			// lesson:4-7 code-spliting一般只配置chunks: 'all',就行了,剩下的让webpack自动执行就行了
			chunks: 'all',
			// lesson:4-5 不加cacheGroups,只写魔法注释,生成的文件会带vendors~
			cacheGroups: {
				vendors: false,
				default: false
			}
		}
		// lesson:4-5 关于splitChunks默认值的解释
		// splitChunks: {
		// chunks可选值:all,async,inital(只针对同步) ,默认值为async因为webpack认为只有异步加载的代码才能提高网站性能(代码利用率)
		// async表示只对异步代码做分割
		// 同步的情况下还需要对cacheGroups.vendors做配置才能生效
		// 	chunks: 'all',
		//表示对多大的库进行分割,大于minSize才分割
		// 	minSize: 30000,
		// lesson:4-5
		// 对已经分割的库进行二次分割,这个配置项很少用
		// 	maxSize: 50000, 
		// minChunks表示当一个模块被其他模块(Chunks)调用多少次之后才会分割出来
		// 	minChunks: 1,
		// 同时加载的模块数(最多打包的模块数,也就是说前五个会生成分割,后面的就不会再生成了)
		// 	maxAsyncRequests: 5,
		// 入口文件做代码分割的数量(一般使用默认配置)
		// 	maxInitialRequests: 3,
		// 生成的文件名字的连接符
		// 	automaticNameDelimiter: '~',
		// 一般使用默认配置
		// 	name: true,
		// 打包同步代码的配置
		// 	cacheGroups: {
		// 	  vendors: {
		// 		test: /[\\/]node_modules[\\/]/,
		// 走cacheGroups里面哪个规则的优先级,表示一个权重,先走权重大的,后走小的,-10>-20
		// 		priority: -10,
		//表示所有的库都打包到vendors.js中,他们属于vendors组,所以前面有个vendors~表示分组
		// 		filename: 'vendors.js',
		// 	  },
		// 	  default: {
		// 		priority: -20,
		// 复用之前被打包过的模块.比如页面加载了a和b,而a本身也加载了b,那么reuseExistingChunk
		//为true时b就不会重复打包,a使用之前打包过的b
		// 		reuseExistingChunk: true,
		// 		filename: 'common.js'
		// 	  }
		// 	}
		//   }
	},
	output: {
		filename: '[name].js',
		// lesson 4-9 入口文件的打包走output的filename配置,
		// 类库(chunk)打包走chunkFilename,直接被html模板引用的就走filename
		// 否则走chunkFilename
		chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../dist')
	}
}