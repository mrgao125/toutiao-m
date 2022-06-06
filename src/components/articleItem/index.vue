<!--文章列表项  -->
<template>
    <!--  :to="`/article/${article.art_id}`"  跳转路由-->
    <!-- cell单元格 to属性和vue-router中的router-link中to使用方法一致 -->
     <!-- van-cell根节点的 to 跳转至文章详情页面 -->
    <van-cell 
      class='article-item'
      :to="{
      name:'article',
        params:{
            articleId:article.art_id
        }
      }"

    >  
      <!-- 文章标题  -->
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label">
          <!-- 下侧显示三张封面图片 -->
          <div v-if="article.cover.type === 3" class="cover-wrap">
              <div 
                class="cover-item" 
                v-for="(coverImg,index) in article.cover.images"
                :key="index"
                >
                <van-image
                 class="cover-img"
                 :src="coverImg"
                 fit="cover"
                />      
              </div>
          </div>

          <!-- 评论标题 -->
          <div class="label-info-wrap">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
               <!-- 处理成相对时间 -->
              <span>{{article.pubdate | relativeTime}}</span>
          </div>
      </div>

      <!-- 右侧显示一张封面图片 -->
      <van-image
        v-if="article.cover.type === 1"
        fit="cover"
        slot="default"
        class="right-cover-img"
        :src="article.cover.images[0]"
       />
         <!-- 报错是因为有些项没有图片 -->          
    </van-cell>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name:'ArticleItem',
components: {},
props:{
    // 从article-list传递过来ajax请求的文章列表数据
    article:{
        type:Object,
        required:true
    }
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
    .article-item {
        .title {
            font-size: 32px;
            color:#3a3a3a;
        }
        .van-cell__value {
            flex:unset;
            width: 232px;
            height: 146px;
            padding-left: 25px;
        }
        .right-cover-img {
            width: 232px;
            height: 146px;       
        }
        .label-info-wrap span{
            font-size: 22px;
            color: #bfbfbf;
            padding-left: 25px;
        }
        .cover-wrap {
            display: flex;
             margin: 30px 0;
            .cover-item {
                flex:1;
                height: 146px;
                &:not(:first-child){
                    padding-left: 4px;
                }
                .cover-img {
                    height: 146px;
                    width: 100%;
                }
            }

        }
    }

</style>