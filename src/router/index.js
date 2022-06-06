import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/',
        // name: 'layout', // 如果父路由有默认子路由,name没有意义
        component: () =>
            import ('@/views/layout'),
        redirect: '/home', // 加载路由重定向
        children: [{
                path: '/home', // 默认子路由
                name: 'home',
                component: () =>
                    import ('@/views/Home')
            },
            {
                path: 'qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa')
            },
            {
                path: 'video',
                name: 'video',
                component: () =>
                    import ('@/views/Video')
            },
            {
                path: 'mypage',
                name: 'mypage',
                component: () =>
                    import ('@/views/MyPage'),
            },
            {
                path: 'userinfo',
                name: 'userinfo',
                component: () =>
                    import ('@/views/userInfo')

            }
        ]
    },
    // 动态路由 params
    // props 开启props数据传递
    // 文章详情路由
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        props: true

    },
    // 收藏列表路由
    {
        path: '/collection',
        name: 'collection',
        component: () =>
            import ('@/views/collections')
    }
]

const router = new VueRouter({
    routes
})

export default router