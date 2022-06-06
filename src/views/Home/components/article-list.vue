<!--列表组件  -->
<template>
<div class='article-list'>
    <!-- van-pull-refresh下拉刷新 -->
    <van-pull-refresh 
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="reFreshSuccessText"
    >
        <!-- van-list内容列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >           
            <!-- van-cell内容单元格,遍历展示 -->
            <!-- <van-cell
              clickable 
              v-for="(item,index) in list" 
              :key="index" 
              :title="item.title" 
            />  -->
            <ArticleItem
                v-for="(article , index) in list"
                :key="index"
                :article="article"
            />
           
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {GetUserArticles} from '@/api/aritcle'
import ArticleItem from '@/components/articleItem'
export default {
name:'ArticleList',
//import引入的组件需要注入到对象中才能使用
components: {ArticleItem},
props:{
    channel:{
        type: Object,
        required: true
    }
},
data() {
//这里存放数据
 return {
      list: [], // 存储列表数据
      loading: false,   // 数据加载状态
      finished: false,  // 数据是否获取完成
      timestamp: null,  // 请求获取下一页的时间戳
      error: false, // 错误提示
      isreFreshLoading: false,  // 下拉刷新数据
      reFreshSuccessText:'刷新成功'  // 下拉刷新成功的文本
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
        // 1 文章标题的请求
         const {data} = await GetUserArticles({
             channel_id:this.channel.id,  // 频道id
            //  简单理解，就是页码
            // 请求第一页：当前时间戳
            // 用于请求之前数据的时间戳会在当前请求中返回给你
             timestamp: this.timestamp || Date.now()  // 当前时间戳
        })
/*         // 验证请求失败，提示错误程序是否有效
        if(Math.random() > 0.5){
            JSON.parse('ssssss')  
        } */
        //  console.log(data)
         // 2 把请求结果放进list中
         const {results} = data.data
         // 数组解构,添加进list
         this.list.push(...results)

         // 3 本次加载结束后把加载状态设置为结束
         this.loading = false

         // 二 发送评论请求
        //  const {res} = await GetArticleComment({
        //      type:a,
        //      source:id
        //  })
        //  console.log(res)
        // // 验证请求失败，提示错误程序是否有效
        // if(Math.random() > 0.8){
        //     JSON.parse('ssssss')  
        // } 

         // 数据全部加载完成
         if(results.length){
             // 更新获取下一页数据的时间戳
             this.timestamp = data.data.pre_timestamp
         }else{
             // 没有数据了，将finished设置为true
             this.finished = true
         }
        } catch (err) {
            // console.log('获取数据失败')
            this.error = true
            this.loading = false
        } 
    },
 // 下拉刷新时候，会调用该方法
async onRefresh(){
    try {
         // 1 请求获取数据
        const {data} = await GetUserArticles({
             channel_id:this.channel.id,  // 频道id
             timestamp: Date.now()  // 下拉刷新，传递当前最新时间戳
        })
        // 随机失败测试
/*         if(Math.random() > 0.5){
            JSON.parse('ssssss')  
        }  */
        //2  将数据追加到顶部
        const results = data.data.results 
        this.list.unshift(...results)

        // 3 下拉刷新成功提示文本
        this.reFreshSuccessText = `刷新成功,更新了${results.length}条数据`
        // 关闭下拉刷新的loading状态 
        this.isreFreshLoading = false

    } catch (err) {
       this.isreFreshLoading = false
       this.reFreshSuccessText = '刷新失败' 
    }         
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeDestroy() {}, //生命周期 - 销毁之前
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
    .article-list {
        // 记住列表滚动位置  给展示数据的列表设置高度属性,设置自动滚动
        height:79vh; // css3移动端响应式视口单位,不受父元素影响
        overflow-y:auto;
        .article-list-img{
            width: 30%;
            height: 146px;
            padding-left: 5px;
        }
    }
</style>