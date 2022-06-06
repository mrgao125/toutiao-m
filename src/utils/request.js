import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

/* // JSONBig 例子
const jsonStr = '{ "art_id" : 1234567891111222333 }'

console.log(JSON.parse(jsonStr)) // js原生转化  1234567891111222300

console.log(JSONBig.parse(jsonStr)) //  生成一个对象

// 使用 bigNumber
// 使用的时候，需要把BigNumber 类型的数据转为字符串使用
console.log(JSONBig.parse(jsonStr).art_id.toString()) // 字符串 1234567891111222333

console.log(JSON.stringify(JSONBig.parse(jsonStr))) // js原生方法，还原多个引号，需要方法对应

console.log(JSONBig.stringify(JSONBig.parse(jsonStr))) // 还原为json格式 */

// JSONBig.parse()  把json格式字符串，转为js对象
// JSONBig.stringify()  把js对象转为json格式字符串   
// 和js原生方法不同之处，它可以处理大数字(超出js 范围之内)



const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/', // 接口基础路径

    // 自定义后端返回的数据
    // transformRequest: [function(data) {
    //     // 默认是 return JSON.parse(data)
    //     // data 是后端返回的原生数据 try catch 为了防止错误 可能后端返回不是json字符串
    //     try {
    //         return JSONBig.parse(data)
    //     } catch (err) {
    //         return data
    //     }
    //     // return data
    // }]
})

// 请求拦截器   如果后面需要授权token 不需要在请求中添加了
request.interceptors.request.use(function(config) {
    // 请求拦截器发起
    // config 配置对象
    // console.log(config)
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    // 这里务必返回config对象，否则请求就停在这里，出不去
    return config
}, function(error) {
    // 请求拦截器失败(还没有发出去)
    return Promise.reject(error);
})

// 响应拦截器



export default request