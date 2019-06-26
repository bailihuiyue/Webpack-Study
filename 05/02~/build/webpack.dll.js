// lesson:5-10
// npm install add-asset-html-webpack-plugin --save
// 在模板注引入打包好的类库(dll)
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		// 对类库单独打包
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
		// jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		// 打包出的库的名字叫vendors
		library: '[name]'
	},
	plugins: [
		//对打包成的dll库进行分析,生成manifest的映射文件,DllReferencePlugin会用到
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}