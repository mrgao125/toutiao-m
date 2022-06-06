import request from "@/utils/request"

// 获取新闻内容
export const GetUserArticles = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

// 获取评论或回复
export const GetArticleComment = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// 获取文章详情
export const GetArticleById = articleId => {
    return request({
        url: `/v1_0/articles/${articleId}`,
        method: 'GET'
    })
}