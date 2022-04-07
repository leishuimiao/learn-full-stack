const { override, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require("path");

module.exports = override(
    // 开启babel装饰器插件的两种方法
    // 这里以 @babel/plugin-proposal-decorators 插件为例， 这个插件是用来支持 es7 装饰器语法的
    // 直接使用 addDecoratorsLegacy() 或 使用 addBabelPlugin() 添加
    addDecoratorsLegacy(),
    // addBabelPlugin 用来配置添加babel插件的，这个是用来支持 es6 装饰器语法的
    // addBabelPlugin(
    //   ["@babel/plugin-proposal-decorators", { "legacy": true }]
    // )
    addWebpackAlias({
        // add your alias
        '@' : path.resolve(__dirname, 'src')
    }),
)