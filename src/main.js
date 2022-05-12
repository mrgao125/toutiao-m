import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载全局样式
import './styles/index.less'

// 按需引入Vant 
import { Button, Cell, CellGroup } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')