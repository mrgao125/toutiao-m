// 用户相关请求模块

import request from "@/utils/request"

// 导入vuex容器，用于获取token
// import store from "@/store"

export const UserLogin = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码，注意每个手机号每分钟只能发送一次
export const SendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户自己信息
export const GetUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
            // 发送请求头数据
            /*         headers: {
                        // 该接口需要授权  token 数据格式，Bearer后面有一个空格
                        Authorization: `Bearer ${store.state.user.token}`
                    } */
    })
}

// 获取用户频道列表
export const GetUserChannelList = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels',
    })
}

// 请求关注用户
export const Userfollowings = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 请求取消关注

export const deleteFollowings = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

// 请求收藏
export const addCollection = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

// 请求取消收藏
export const deleteCollection = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}

// 请求获取收藏列表
export const GetUserCollections = params => {
    return request({
        method: 'GET',
        url: '/v1_0/article/collections',
        params
    })
}