<!-- 文章详情 -->
<template>
  <div class="article-detail-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="黑马头条"
        @click-left="$router.back()"
      >
      </van-nav-bar>
      <!-- 导航栏 -->

      <div class="main-wrap">
        <!-- 加载中 -->
        <div v-if="loading" class="load-wrap">
          <van-loading 
            color="#0094ff" 
            vertical
          >
            加载中
          </van-loading>
        </div>
        <!-- 加载中 -->

        <!-- 加载完成文章详情 -->
        <div v-else-if="article.title" class="article-detail">
          <!-- 文章标题  -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- 文章标题  -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            >
            </van-image>
            <div slot="title" class="user-name">{{article.aut_name}}</div>
            <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

            
            <!-- article是获取过来的数据，所以需要通过发请求来改变数据 -->
            <!-- 关注组件 -->
            <!-- 模板中的$event 是事件参数 -->
            <!-- @update-is_follow="article.is_followed = $event" 自定义事件模板内写法-->
            <!-- 当我们传递给子组件的数据，既要使用，也要修改 
              传递：props
                :is-followed="article.is_followed"
              修改：自定义事件
                @update-is_follow="update_is_follow($event)"
              简写方式：在组件上使用v-model 相当于以下代码 绑定一个value事件，监听input事件
                value="article.is_followed"
                @input="article.is_followed = $event"
                // 如果需要修改 v-model 的事件名称，可以通过子组件的model属性修改
                // 如果有多个数据 需要 实现v-model的效果，可以使用属性 .sync 修饰符 
            -->
            <follow-user
              class="follow-btn"
              v-model="article.is_followed"
              :userId="article.aut_id"
            />
            <!-- <van-button
              v-if="!article.is_followed"
              class="follow-btn"
              round
              type="info"
              icon="plus"
              size="small"
              color="#3296fa"
              :loading="followLoading"
              @click="onFollowing"
            >
            关注
            </van-button>
            <van-button
              v-else
              class="follow-btn"
              size="small"
              :loading="followLoading"
              @click="onFollowing"
            >
            已关注
            </van-button> -->
          </van-cell>
          <!-- 用户信息 -->


         <!-- 文章内容 -->
          <div 
            class="article-content markdown-body" 
            v-html="article.content"
            ref="article-content"
          >
          </div>
          <van-divider>正文结束</van-divider>

          <!-- 文章评论列表 -->
          <!-- <div> comment-list组件 </div> -->

        <!-- <comment-list
          :source="article.art_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
        /> -->
        <!-- /文章评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论</van-button>

          <van-icon
            class="comment-icon"
            name="comment-o"
          />

          <!--  收藏组件  -->
          <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :articleId="article.art_id" 
          /> 
          <!-- <van-icon name="star-o" /> -->
<!--       <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          /> -->

          <!-- like-article 组件 -->
         
<!--      <like-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

         <!-- 发布评论 -->
        <!-- <van-popup
          v-model="isPostShow"
          position="bottom"
        >
        
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup> -->
        <!-- 发布评论 -->
        </div>
      <!-- 加载完成文章详情 -->

      <!-- 加载失败：404 -->
        <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
        </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div v-else class="error-wrap">
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button
            class="retry-btn"
            @click="loadArticle"
          >
            点击重试
          </van-button>
        </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { GetArticleById } from '@/api/aritcle'
import { ImagePreview} from 'vant'

import CollectArticle from '@/components/collect-article'


// 引入 follow-user组件
import FollowUser from '@/components/follow-user'



// ImagePreview({
//   images: [
//   'https://img01.yzcdn.cn/vant/apple-1.jpg',
//   'https://img01.yzcdn.cn/vant/apple-2.jpg',
//   ],
//   // 起始位置
//   startPosition: 1,
//   // 关闭事件
//   onClose() {
//     Toast('关闭');
//   }
// })

export default {
name:'ArticleIndex',
props:{
  articleId:{
    type:[ Number, String, Object],
    required:true
  }
},
//import引入的组件需要注入到对象中才能使用
components: { FollowUser, CollectArticle},
data() {
  return {
  loading:true, // 控制 加载中 的 loading 状态
  article:{},   // 文章详情 (此处数据类型根据后端数据 确定 )
  errStatus:0,  // 文章加载失败状态码
  
  }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  // 1.获取文章请求
  async loadArticle () {
    // 加载失败  重新加载  初始化 loading 状态
    this.loading = true 
    try {
      const {data} = await GetArticleById(this.articleId)

      // 模拟加载失败
      // if (Math.random() > 0.5) {
      //   JSON.parse('ssssssssssssss')
      // }
      // 数据驱动 视图更新，vue中不是立即发生
      console.log(data)
      this.article = data.data

      // 初始化图片点击预览  由于vue异步加载视图，所以获取dom需要 异步操作
      setTimeout(() => {
        this.previewImage()
      }, 0)
      

    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.errStatus = 404
      }
      console.log('获取数据失败',err)
    }
    // 请求结束(成功或者失败)，关闭 加载中 状态 
    this.loading = false
  },
  // 2.文章内图片点击放大功能
  previewImage () {
    // 得到所有 img 节点
    const articleContent = this.$refs['article-content']
    const imgs = articleContent.querySelectorAll('img')
    console.log(imgs)
    const images = []    // 图片的urls

    imgs.forEach((img, index) => {
      // url有问题，处理分隔
      const arr = img.src.split('url=')
  
      images.push(arr[1])

      
      img.onclick = () => {
        ImagePreview({
          // 预览的图片地址数组
          images: images,
          // 起始位置
          startPosition: index
        })
      }
    })

 

  }
  
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.loadArticle()
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
@import "./github-markdown.css";


.article-detail-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 100vh;
    overflow-y: auto;
  }

  .load-wrap {
    display: block;
    position:absolute;
    top:20vh;
    width: 100%;
    height: 100px;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
        font-size: 25px;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      width: 40px;
      line-height: 40px;
      color: #777777;
      z-index: 99
    }
    /deep/.van-button {
      border: none;
      padding: 0;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>