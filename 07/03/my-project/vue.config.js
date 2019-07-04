// lesson:7-3
// vue-cli3没有方法可以暴露出原始的webpack配置文件,但是可以在根目录添加vue.config.js文件来扩展webpack配置
// 使用时参考vue-cli官网,vue-cli已经对webpack进行了封装,所以要按照vue-cli的方式去写配置
// https://cli.vuejs.org/zh/config/
const path = require('path');

module.exports = {
	// 一些特殊情况还是可以直接写webpack配置的
	configureWebpack: {
		devServer: {
			contentBase: [path.resolve(__dirname, 'static')],
		}
	}
}