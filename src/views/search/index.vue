<!-- 搜索页面 -->
<template>
    <div class='search-container'>
      <!-- 搜索框 -->
      <form action="/" class="search-form">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          background="#3296fa"
          @focus="isRresultShow = false"
        />
      </form>
      <!-- 搜索框 -->

      <!-- 搜索结果 -->
      <SearchResult 
        v-if="isRresultShow"
        :searchText="searchText"
        />
      <!-- 搜索结果 -->

      <!-- 联想建议 -->
      <!-- @search 执行子组件自定义事件传递数据 vant-search组件自带的 事件 onSearch  触发搜索-->
      <SearchSuggestion 
        v-else-if="searchText"
        :searchText="searchText"
        @search="onSearch"
      />
      <!-- 联想建议 -->

      <!-- 搜索历史记录 -->
      <!-- 通过自定义事件clear-search-history，子组件传递数据给父组件，清空数组数据 -->
      <!-- @search 执行子组件自定义事件传递数据 vant-search组件自带的 事件 onSearch 触发搜索 -->
      <SearchHistory 
        v-else
        :searchHistories="searchHistories"
        @clear-search-history="searchHistories = []"
        @search="onSearch"
      />
      <!-- 搜索历史记录 -->


      

    </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'

import SearchSuggestion from './components/search-suggestion.vue'

import SearchResult from './components/search-result.vue'

// 引入本地存储方法
import { setItem , getItem} from '@/utils/storage'
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name:'SearchIndex',
//import引入的组件需要注入到对象中才能使用
components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
},
data() {
//这里存放数据
return {
    searchText: '',
    isRresultShow:false,  // 控制搜索结果展示
    searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []   // 搜索历史数据
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    searchHistories:{
        // 将历史数据 本地存储,如果有线上接口，也可以结合线上接口。(登录状态，使用线上请求，非登录状态，使用本地存储)
        handler (val) {
            setItem('TOUTIAO_SEARCH_HISTORIES',val)
        }
    }
},
//方法集合
methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 不要有重复记录，最新搜索的排在最前面
      
      const index = this.searchHistories.indexOf(val) 
      // 先根据索引，判断原数组是否存在，存在删除，不存在继续下面代码
      if(index !== -1) {
          this.searchHistories.splice(index,1)
      }
      // 将新的搜索添加最前面
      this.searchHistories.unshift(val)

      // 触发搜索，展示渲染搜索结果
      this.isRresultShow = true  

    },
    onCancel() {
      this.$router.back()
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
},
beforeUpdate() {}, //生命周期 - 更新之前
beforeDestroy() {}, //生命周期 - 销毁之前
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.search-container{
    padding-top: 108px;
    .van-search__action{
        color:#ffff
    }
    .search-form {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1; 
    }
}
    
</style>