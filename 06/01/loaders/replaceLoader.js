const loaderUtils = require('loader-utils');

// lesson:6-1 loader就是一个函数,
// 但是注意不能写成箭头函数,为了不让this出问题
// source是传入的文件的源代码
module.exports = function (source) {
	return source.replace('lee', 'world');
	//也可以使用 this.callback传递更多信息

}

// 自定义loader的一些使用场景:1.给每个方法都加上try catch,2.国际化