// lesson:6-1
const loaderUtils = require('loader-utils');

module.exports = function (source) {
	// 有时获得query会有坑,官方推荐loaderUtils来获取参数
	const options = loaderUtils.getOptions(this);
	const callback = this.async();

	setTimeout(() => {
		const result = source.replace('dell', options.name);
		// loader必须同步返回(return出东西,否则就报错,可以使用this.async这个内置方法来解决)
		callback(null, result);
	}, 1000);
}