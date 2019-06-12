const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // lesson:3-7
    // source-map就表示编译前后编译后的一种映射关系,编译后的代码行数,报错位置和编译前不一样
    // 不方便查错,所以使用source-map建立一种映射关系,build后的代码可以查看到编译前的错误位置
    // source-map会在输出的dist目录输出一个和js文件同名的.map文件,用于建立映射关系
    // inline-source-map则不会输出映射内容到单独文件,会写在编译后的文件的最后一行
    // inline-cheap-source-map只提示出错行,如果不加cheap,则提示第几行第几列错了,这样详细的提示会导致编译很耗时
    // 所以一般加cheap,只要知道哪行错了就好了
    // 一般source-map不会映射第三方类库/模块的代码,只会映射自己写的代码
    // cheap-module-source-map就会映射第三方类库了 
    // eval是使用eval()的方式映射的,速度最快,但是复杂代码不一定映射的全面
    // cheap-module-eval-source-map 这是development下devtool的最佳实践
    // cheap-module-source-map 是production下devtool的最佳实践
    // source-map原理: 浏览器，Chrome和FF均提供Source Maps支持（IE11依然不支持），
    // 浏览器实质上提供的是.map文件解析引擎，根据.map文件内容加载源文件和在调试模式中关联源码和编译后代码。
    // 使用了VLQ编码,最早用于MIDI文件，后来被多种格式采用。它的特点就是可以非常精简地表示很大的数值。
    // 参考文章:
    // https://www.cnblogs.com/axl234/p/6500534.html
    // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    // https://www.cnblogs.com/fsjohnhuang/p/4208566.html
    devtool: 'source-map',
    entry: {
        main: './src/index.js',
        // lesson:3-6 打包多个文件,key随便起
		// sub: './src/index.js'
    },
    // lesson:3-8
    // devServer比--watch更强大,可以自动打包并启动浏览器,每次修改文件后自动刷新浏览器
    // 需要安装webpack-dev-server
    // package文件scripts添加"server": "node server.js"在server.js文件中可以实现自己的dev-server
    // server.js文件要和webpack.config.js文件同级
    devServer: {
        contentBase: './dist',
        // 自动起一个服务,并打开浏览器
		open: true,
        port: 8080,
        //代理,url转发,vue-cli等脚手架工具可以支持代理是因为内部使用了webpack-dev-server
        proxy:{
            '/api':'http://localhost:3000'
        }
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
            test: /\.css$/,
            // lesson:3-3
            // css-loader 分析css文件之间的关系,最终合并成一段css
            // style-loader 将css-loader生成的css代码挂在到html模板的head部分
            // 数组loader的执行顺序:从右到左
            // sass-loader先将sass编译成普通的css,然后再使用css-loader和style-loader
            // postcss-loader在css3特性前加前缀(使用插件autoprefixer),例如-webkit-transform,详细配置见https://webpack.docschina.org/loaders/postcss-loader/
            use: [
                'style-loader',
                // lesson:3-4
                //数组类型的rules要想添加其他内容,可以写成object
                {
                    loader: 'css-loader',
                    options: {
                        //从页面import的sass文件会走这4个loader,
                        // 但是在sass中在@import的sass就不走之后的loader了
                        // importLoaders:2表示@import的sass还要走下面的loader
                        importLoaders: 2,
                        //模块化打包 
                        //false时 import './style.css'
                        //true时 import styles from './style.css'
                        // 就可以拿到styles使用了
                        modules: true
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        },
        {
            // lesson:3-4
            // 打包字体文件
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    // lesson:3-5
    // HtmlWebpackPlugin 在打包结束后自动生成一个html文件,并自动引入生成的js文件到html
    // template表示拷贝这个模板文件
    // plugins有点类似于生命周期函数(或者说plugins里面有声明周期),HtmlWebpackPlugin的生命周期是打包结束的时候
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
        //CleanWebpackPlugin 打包之前先清空dist目录
	}), new CleanWebpackPlugin()],
    output: {
        // lesson:3-6 
        // 打包后引入的js文件前面自动添加publicPath
        // publicPath:'http://cdn.com.cn',
        // 根据entry中的名字(key)起名
		filename: '[name].js',
        //filename: "bundle.js",//输出文件名
        path: path.resolve(__dirname, 'dist')//输出文件地址(需要__dirname转换成绝对路径)
    }
}