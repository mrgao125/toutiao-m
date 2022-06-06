import request from "@/utils/request"

// 获取联想建议请求
export const getSugestions = q => {
    return request({
        url: '/v1_0/suggestion',
        method: 'GET',
        params: {
            q
        }
    })
}

// 获取请求结果请求
export const getResults = params => {
    return request({
        url: '/v1_0/search',
        method: 'GET',
        params
    })
}