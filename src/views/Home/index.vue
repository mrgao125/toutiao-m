<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
       class="search-btn"
       round
       slot="title"
       type="info"
       size="small"
       icon="search"
       to="/search"
       >
       <!-- <i slot="icon" class="iconfont icon-sousuo"></i> -->
       搜索
       </van-button>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 频道列表开始 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画
          通过 swipeable 属性可以开启滑动切换标签页 滑动存在小问题：只能在有内容的区域滑动，需要解决
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable> 
      <van-tab
      :title="channel.name"
       v-for="channel in channels"
      :key="channel.id"
      > 
      <!-- 文章列表  -->
        <ArticleList :channel="channel"/>

      </van-tab>
      <!-- 占位作用 处理最好一个标签不能完全显示的问题 -->
      <div slot="nav-right" class="placeholder"></div>

      <!-- 此处使用div包裹起来，可以当按钮使用 -->
      <div 
       slot="nav-right" 
       class="hamburger-btn" 
       @click="showPopup">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表结束 -->

    <!-- 频道弹出层 -->
    <van-popup
     v-model="isChanelEditShow"
     closeable
     position="bottom"
     close-icon-position="top-left"
     :style="{ height: '100%' }"
    >
      <ChannelEdit 
       :myChannels="channels" 
       :activeChanel="active"
       :deleteChannel="deleteChannel"
       :changeChannel="changeChannel"
       />
    </van-popup>
    <!-- 频道弹出层 -->
  </div>
</template>

<script>
// 引入获取用户频道请求方法
import {GetUserChannelList} from '@/api/user'

// 引入ArticleList和ChannelEdit组件
import ArticleList from './components/article-list.vue'

import ChannelEdit from './components/channel-edit.vue'

// 引入vuex中的 map 方法
import {mapState} from 'vuex' 

// 引入删除请求方法
import {deleteUserChannels} from '@/api/channel'

// 引入本地存储方法
import {setItem,getItem} from '@/utils/storage'
export default {    
  name:'HomeIndex',
  components:{
    ArticleList,
    ChannelEdit
    },
  data() {
    return {
      active: 0,
      channels:[], // 用户频道列表
      isChanelEditShow: false // 控制频道弹出层显示状态
    }
  },
  created(){
    this.LoadUserChannelList()
  },
  computed:{
      // 映射 vuex中的数据 user 
    ...mapState(['user'])
  },
  methods:{
    async LoadUserChannelList(){
      try {
        let channels = []
        if(this.user){
          // 已登录，请求获取用户频道列表
          const {data} = await GetUserChannelList()
          console.log(data)
          channels = data.data.channels
        }else{
          // 未登录，获取本地存储数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 如果本地存储有，就拿来使用
          if(localChannels){
            channels = localChannels
          }else{
            // 如果本地存储没有，获取默认列表
            const {data} = await GetUserChannelList()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 控制弹出层函数
    showPopup() {
      this.isChanelEditShow = true;
    },
    //切换频道 关闭弹层 回调函数
    changeChannel(index,isChanelEditShow = true){
      this.active = index
      // ES6语法 ：传递参数设置默认值，不传递则为默认值，传递则为传递的数据
      this.isChanelEditShow = isChanelEditShow

    },
    deleteChannel(channel,index){
        // console.log(channel)
        // 删除操作
        // 使用splice删除指定数组元素
        if(index <= this.active) {
          this.active = this.active - 1
        }
        this.channels.splice(index,1)

        // 处理持久化
        this.deleteChannelRequest(channel)
        // 过滤实现删除
        // this.channels = this.channels.filter(item =>{
        //     return item.id !== channel.id
        // })
    },
    // 封装删除频道 请求 回调
    async deleteChannelRequest(channel) {
        if(this.user) {
            // 将数据请求到后台
            try {
                await deleteUserChannels(channel.id)
            } catch (err) {
                this.$toast('删除失败')
            }
        }else{
            // 没有登录，将数据存储到本地
            setItem('TOUTIAO_CHANNELS',this.channels)
        } 
    }

  },
  mounted(){
    this.$bus.$on('deleteChannel',this.deleteChannel)
    this.$bus.$on('changeChannel',this.changeChannel)
  },
  beforeDestroy() {
    this.$bus.$off('deleteChannel')
    this.$bus.$off('changeChannel')

  }
}
</script>

<style scoped lang="less">
  .home-container {
    padding-bottom: 100px;
    padding-top: 174px;
    // 覆盖样式需要加 ::v-deep
      ::v-deep.van-nav-bar__title {
        max-width: unset;
      }
    .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
      .van-button__icon{
      font-size: 32px;
     }
    }
   .channel-tabs{
      .van-tabs__content {
        // 响应式布局单位vm和vh 
        // vm 1 vm 等于布局视口宽度的1%
        // vh 1 vh 等于布局视口高度的1%
        min-height: 79vh;
      }
      /deep/.van-tabs__wrap{
         height: 82px;
         position: fixed;
         // 左右撑开
         left: 0;
         right: 0;
         top:92px;
         z-index: 1;
      }
      /deep/.van-tab {
        font-size: 28px;
        color: #777777;
        min-width: 200px;
        border-right:1px solid #edeff3;
      }
      /deep/.van-tab--active{
        color:#333333;
        font-size: 30px;
      }
      /deep/.van-tabs__line{
        bottom: 8px;
        width: 31px;
        height: 6px;
        background-color: #3296fa;
      }
      /deep/.van-tabs__nav--line {
        padding: 0;
      }
      .hamburger-btn{
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: .9;
        i.iconfont{
          font-size: 33px;
        }
        &:before{
          content: '';
          position: absolute;
          left: 0;
          // 这里1px浏览器模拟器看不到，手机上可以看到
          width: 1px;
          height: 100%;
          background: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .placeholder{
        // 设置该元素不参与flex布局中的剩余空间计算，0 不参与 1 参与
        flex-shrink:0;
        width: 66px;
        height: 82px;
      }
    }
    /deep/.van-popup__close-icon {
      color:#222222;
    }

  }
</style>