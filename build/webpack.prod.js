const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    //lesson:4-2    //production模式不需要
    // new webpack.HotModuleReplacementPlugin()

    //lesson:4-2 
    //production模式不需要
    // devServer: {
    //     disableHostCheck: true,
    //     contentBase: './dist',
    //     open: true,
    //     port: 8080,
    //     proxy: {
    //         '/api': 'http://localhost:3000'
    //     },
    //     hot: true,
    //     hotOnly: true
    // },
}

module.exports = merge(commonConfig, prodConfig);