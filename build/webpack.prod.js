const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    // lesson:4-2    //production模式不需要
    // new webpack.HotModuleReplacementPlugin()

    // lesson:4-2 
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
    // lesson:4-9 MiniCssExtractPlugin会合并所有css文件到一个文件中(不压缩)
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader'
                ]
            }
        ]
    },
    // lesson 4-10 contenthash会根据内容变化而变化,就像md5
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    }
}

module.exports = merge(commonConfig, prodConfig);