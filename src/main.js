import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'
// 加载动态设置 REM 基准值  此插件会将设备分成10份
import 'amfe-flexible'

// 加载dayjs
import './utils/dayjs'





// // 按需引入Vant 
import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog, Tab, Tabs, List, PullRefresh, Popup, Search, Loading, Divider } from 'vant'
Vue.use(Icon)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Divider)


// // 全局引入整个vant组件
// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant)



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this // 安全全局事件总线
    }
}).$mount('#app')