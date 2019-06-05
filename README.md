<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css">

<article class="markdown-body">
    <h1>Unicorns</h1>
    <p>All the things</p>
</article>

## 慕课网:从基础到实战手把手带你掌握新版Webpack4.0 学习笔记

| 章节/编号 |                                                        |                                                              |                                                              |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 2-2       |                                                        |                                                              |                                                              |
| 1         | webpack是一个模块打包工具,自身职能翻译import这样的语句 | 除了能识别js module(import)的加载方式,commonjs(require,module.exports),amd,cmd的加载方式都能识别 |                                                              |
| 2-3       |                                                        |                                                              |                                                              |
| 1         | 建议项目内安装webpack                                  | 因为有的项目是webpack3,有的是4,全局只有一个版本,会出问题     |                                                              |
| 2         | npx                                                    | 因为有的项目是webpack3,有的是4,全局只有一个版本,会出问题     | 执行当前目录下的node包中的命令,比如npx webpack,就是执行当前目录下的webpack,否则直接写webpack就会全局搜索了,搜不到就报错了 |
| 3         | npm init -y                                            | 自动生成默认配置,不需要询问了                                |                                                              |
| 4         | npm info webpack                                       | 可以查看webpack的所有信息,包括版本                           |                                                              |
| 2-4       |                                                        |                                                              |                                                              |
| 1         | webpack默认配置文件名字叫webpack.config.js             | 使用npx webpack --config abc.js可以修改默认webpack配置文件名字 |                                                              |
|           |                                                        |                                                              |                                                              |