//  PostCSS 处理css 
// px转化为rem单位插件配置
module.exports = {
    plugins: {
        // 配置使用autoprefixer插件，这里又配置了一次，会产生警告
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'ios >= 8']
        // },
        // 配置使用postcss-pxtorem插件
        'postcss-pxtorem': {
            // 基于lib-flexible的REM适配方案，把一行分为10份，每一份是十分之一
            // 所有此配置项 应该设置为设计稿的十分之一
            // 我们的设计稿是750 所以应该设置为75 
            // 但是vant 建议是37.5 为什么？因为vant是基于375
            // 所以必须设置为375，唯一的缺点就是我们使用设计稿的尺寸都必须除2
            // 有没有更好的办法：如果是vant的样式，使用37.5  如果我们自己的 用75
            // 通过查阅文档，rootValue 支持两种类型，数字和函数 
            // postcss 处理每个css文件的时候，都会调用这个函数  它会把被处理的css文件相关信息，通过参数传递给该函数
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置需要转换的css属性
            propList: ['*'],
            // 配置不要转换的文件资源
            exclude: 'github-markdown'
        },
    },
};