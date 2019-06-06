const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.png$/,
            use: {
                loader: 'file-loader',
            }
        }]
    },
    output: {
        filename: "bundle.js",//输出文件名
        path: path.resolve(__dirname, 'dist')//输出文件地址(需要__dirname转换成绝对路径)
    }
}