import request from '@/utils/request'

// 获取所有频道
export const GetAllChannels = () => {
    return request({
        url: '/v1_0/channels',
        method: 'GET'
    })
}

// 添加用户频道
export const addUserChannels = channel => {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
            // 按照接口文档，此处channel是频道对象
            channels: [channel]
        }
    })
}

// 删除用户指定频道
export const deleteUserChannels = channelId => {
    return request({
        url: `/v1_0/user/channels/${channelId}`,
        method: 'DELETE'

    })
}