<!-- 搜索结果 -->
<template>
<div class='search-result'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell 
       v-for="item in list" 
       :key="item.art_id" 
       :title="item.title" 
       />
    </van-list>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getResults} from '@/api/search'
export default {
name:'SearchResult',
props:{
    searchText:{
        type:String,
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {    
      list: [],
      loading: false,
      finished: false,
      page:1, // 页面默认是 1,用于刷新页面展示下一页数据
      per_page:20,  // 每页展示数据
      error: false,  // 加载失败
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async onLoad() {
        try {
             // 发送请求
            const {data} = await getResults({
                page: this.page,  // /页码
                 per_page:this.per_page, // 每页大小
                 q:this.searchText  // 查询关键词
             })
             // 验证请求失败情况
/*             if(Math.random() > 0.5){
                JSON.parse('ssssss')  
            }  */
             const results = data.data.results
             this.list.push(...results)
             // 加载状态结束
             this.loading = false
             // 判断是否还有数据，如果有，更新获取下一页数据
             if (results.length) {
                 this.page++
             }else {
                 this.finished = true
             }
        } catch (err) {
            this.error = true   // 加载失败
            this.loading = false  // 加载失败，loading关闭
        }

    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeUpdate() {

}, //生命周期 - 更新之前
beforeDestroy() {
}, //生命周期 - 销毁之前
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>