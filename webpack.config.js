const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",//输出文件名
        path: path.resolve(__dirname,'dist')//输出文件地址(需要__dirname转换成绝对路径)
    }
}