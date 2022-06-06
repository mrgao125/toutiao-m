import Vue from 'vue'
// 加载dayjs包  默认是英文，配置为中文

import dayjs from 'dayjs'

// 加载相对时间插件 

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对时间的插件
dayjs.extend(relativeTime)

// 加载中文语言包
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn') // 配置全局使用

// 定义一个全局过滤器,然后就可以在任何组件的模板中使用(相当于一个全局方法，仅供template模板使用)
// 参数1：过滤器名称
// 参数2 过滤函数
// 使用方式：{{表达式 | 过滤器名称}}
// | 前面的表达式，会作为参数传递到过滤器函数中， 过滤器返回的值会渲染到页面中
Vue.filter('relativeTime', value => {
    // value 可以获取当前 数据 此处是当前时间
    return dayjs().to(dayjs(value))
})