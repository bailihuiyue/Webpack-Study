const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            // lesson:3-2
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'url-loader',//url-loader也可以打包图片,但是会把图片变成base64写在页面中,优点,减少http请求,缺点,打包后的js文件特别大,会加载很久
                options: {
                    //webpack官网file-loader下查找placeHolder 视频3-2
                    name: '[name]_[hash].[ext]',//可以使输出的文件名不变
                    outputPath: 'images/', //输出路径(以dist为根目录)
                    limit: 2048 //限制url-loader打包的文件大小,单位字节,小于limit的话直接写在js文件中,大于输出到文件夹中(仅url-loader有此设置)
                }
            }
        },
        {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        },
        {
            test: /\.css$/,
            // lesson:3-3
            // css-loader 分析css文件之间的关系,最终合并成一段css
            // style-loader 将css-loader生成的css代码挂在到html模板的head部分
            // 数组loader的执行顺序:从右到左
            // sass-loader先将sass编译成普通的css,然后再使用css-loader和style-loader
            // postcss-loader在css3特性前加前缀(使用插件autoprefixer),例如-webkit-transform,详细配置见https://webpack.docschina.org/loaders/postcss-loader/
            use: ['style-loader', 'css-loader','sass-loader','postcss-loader'] 
        }]
    },
    output: {
        filename: "bundle.js",//输出文件名
        path: path.resolve(__dirname, 'dist')//输出文件地址(需要__dirname转换成绝对路径)
    }
}