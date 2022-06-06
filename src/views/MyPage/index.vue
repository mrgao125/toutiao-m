<template>
  <div class="mypage-container">
      <!-- 路由入口 -->
      <router-view></router-view>
      <!-- 已登录头部 -->
      
      <div class="header user-info" v-if="user">
        <div class="base-info">
          <div class="left">
            <van-image
              class="picture"
              round
              fit="cover"
              :src="userInfo.photo"
            />
            <span class="left-text">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button type="default" round size="mini" to="/userinfo">编辑按钮</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>

      <!-- 未登录头部 -->
      <div v-else class="header not-login" >
        <div class="login-btn" @click="$router.push('/login')">
         <div class="mobile-img"></div>
         <span class="text">登录 / 注册</span>
        </div>
      </div>
      <!-- 导航模块 -->

      <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item 
          text="收 藏" 
          class="grid-item"
          to="/collection"
          @click="loadUserCollectionList"
        >
          <i slot="icon" class="iconfont icon-shoucang"></i>
        </van-grid-item>
        <van-grid-item text="历 史" class="grid-item">
          <i slot="icon" class="iconfont icon-lishi"></i>
        </van-grid-item>
      </van-grid>
      <!-- 导航模块 -->

      <!-- 通知 和 小智同学 退出登录 模块 -->
      <van-cell-group class="cell-nav">
        <van-cell title="消息通知" is-link size="large"/>
        <van-cell title="小智同学" is-link size="large"/>
        <van-cell
          clickable 
          v-if="user" 
          title="退出登录" 
          size="large" 
          class="logout" 
          @click="logOut"
        />
      </van-cell-group>
  </div>
</template>

<script>
import { GetUserInfo, GetUserCollections} from '@/api/user'
import { mapState } from 'vuex'


export default {    
  name:'MyPageIndex',
  data() {
    return {
      userInfo:{} // 用户信息
    }
  },
  computed:{
      ...mapState(['user'])
  },
  created(){
    // 如果用户登陆了，请求加载用户数据
    if(this.user){
      this.loadUserInfo()
    }
  },
  methods:{
    // 退出登录功能
    // 在组件中需要使用,this.$dialog
    logOut(){
      this.$dialog.confirm({
        title: '确认退出吗',
        message: '弹窗内容',
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
          
        })
    },

    async loadUserInfo(){
      try {
       const {data} = await GetUserInfo()
       console.log(data)
       this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    },
    async loadUserCollectionList () {
      try {
        const { data } = await GetUserCollections()
        console.log(data)
      } catch (err) {
        this.$toast('获取收藏列表失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
  .mypage-container{
    .header {
      height: 361px;
      background: url("../../assets/banner.png");
      background-size:cover;
      }
     .not-login {
        display: flex;
        justify-content: center;
        align-items: center;
        .login-btn{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .mobile-img{
            width: 132px;
            height: 132px;
            background: url(~@/assets/mobile.png);
            background-size: cover;
            margin-bottom: 15px;
          }
          .text {
            font-size:28px;
            color: #fff;
          }        
        }
     }
    .user-info {
      .base-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 231px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        .left{
          display: flex;
          align-items: center;
          .picture{
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 2px solid #fff;
          }
          .left-text{
            font-size: 30px;
            color:#fff;
          }
        }
        .right {
          button {
            color:#8c8c8c;
          }
          
         }
      }
      .data-stats{
        display: flex;
        align-items: center;
        height: 130px;
        .data-item{
          height: 100%;
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color:#fff;
          .count{
            font-size: 36px;
          }
          .text{
            font-size: 23px;
          }

        }
      }
    }
    .grid-nav{
      .grid-item{
          .iconfont {
            font-size: 50px;
            color:#eb5253;
          }
          .icon-lishi {
            color:#ff9d1d;
          }  
      }
    }
    .cell-nav{
      margin-top: 10px;
      .logout{
        margin-top: 10px;
        font-size: 30px;
        text-align: center;
        color:#d86262;
      }
    }
  }
  
</style>