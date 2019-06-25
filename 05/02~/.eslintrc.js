// lesson:5-6
// 首先安装eslint,然后初始化:npx eslint --init
// 命令行方式检测代码:npx eslint src
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        // document变量不允许被覆盖
        document:false
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    // eslint检查项的配置文件
    "rules": {
    }
};