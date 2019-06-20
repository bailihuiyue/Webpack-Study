// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			// 单一loader直接写loader就行了,多个就要使用use数组了
			use: [
				{ loader: 'babel-loader' },
				//lesson:4-11将this指向从模块本身指向window
				{ loader: 'imports-loader?this=>window' }
			],
			// loader: 'babel-loader',
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
		new CleanWebpackPlugin(),
		// lesson:4-11 webpack发现代码中使用了$,就自动帮你引入jquery,相当于全局引用
		// 用于解决老版本js插件不支持import的问题
		// ProvidePlugin就是一个shimming(垫片)
		// $css表示将jquery.css转换成$css
		new webpack.ProvidePlugin({
			$: 'jquery',
			$css: ['jquery', 'css']
		})
	],
	// lesson:4-4
	optimization: {
		// lesson:4-10 老版本webpack4每次打包都会变化hash,设置这个选项让他根据文件内容而变
		// webpack打包时也会生成包与包之间关系的一段代码(或者是文件)叫做manifest,每次打包时manifest会变化,而这个manifest
		// 在老版本webpack中会写在js文件(mian等等各个文件)中,导致文件每次都不一样,生成了不同hash
		// 配置了runtimeChunk之后就把manifest抽离到单独的文件中,这样业务文件或者类库文件就不受manifest的变化而导致hash不同了
		runtimeChunk: {
			name: 'runtime'
		},
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
	// lesson:4-10 webpack build时不输出警告
	performance: false,
	// lesson 4-10 分别移入webpack.dev.js和webpack.prod.js
	// output: {
	// 	filename: '[name].js',
	// 	// lesson 4-9 入口文件的打包走output的filename配置,
	// 	// 类库(chunk)打包走chunkFilename,直接被html模板引用的就走filename
	// 	// 否则走chunkFilename
	// 	chunkFilename: '[name].chunk.js',
	// 	path: path.resolve(__dirname, '../dist')
	// }
}