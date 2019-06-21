//lesson:3-8
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在node中直接使用webpack
// 在命令行里使用webpack
// complier返回一个webpack编译器,调用一次,代码打包一次
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {}));

app.listen(3000, () => {
	console.log('server is running');
});