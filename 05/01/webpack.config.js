const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    // lesson:5-1 如果自己编写的库引入了lodash,用户在业务代码中又引入了lodash,
    // 那么打包后的代码会有两份lodash代码,使用externals解决该问题,
    // 相当于库打包时不打包库的依赖,谁用谁自己在业务代码中加载
    // 但是使用这个之后页面必须引入自己写的库依赖的那个库
    // 比如库a引入了lodash,那么使用库a时需要在引入a之前提前引入lodash
    // externals: {
    //     lodash:{
    //         // 表示以js标签方式引入,全局必须有一个_变量
    //         root:'_',
    //          // 表示以require方式引入,必须require一个叫做lodash的东西
    //         commonjs:'lodash'
    //     }
    // },
    externals: 'lodash',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        // lesson:5-1 umd表示可以支持所有的引入类型,比如import,require等
        // 也可以写成this,挂载到全局的this上,或者window,nodejs中可以是global
        libraryTarget: 'umd',
        // 打包后的代码可以挂载到一个全局变量上,叫library1
        library: 'library1'
    }
}