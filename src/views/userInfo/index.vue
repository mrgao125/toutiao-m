<template>
  <div class="userInfo-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
      >
        <span slot="left">
          <van-icon name="arrow-left" @click="$router.back()"></van-icon>
        </span>
        <span slot="right" class="right-text" @click="onSubmitPersonMsg">保存</span>
      </van-nav-bar>
      <!-- 个人信息  -->
      <van-cell-group>
        <van-cell title="头像" is-link>
          <span slot="default">{{userInfo.headIcon}}</span>
        </van-cell>
        <van-cell title="昵称" is-link>
          <span slot="default">{{userInfo.petName}}</span>
        </van-cell>
        <van-cell title="介绍" is-link>
          <span slot="default">{{userInfo.introduction}}</span>
        </van-cell>
        <van-cell title="性别" is-link>
          <span slot="default">{{userInfo.userSex}}</span>
        </van-cell>
        <van-cell title="生日" is-link>
          <span slot="default">{{userInfo.userBirthday}}</span>
        </van-cell>
     </van-cell-group>

     <!-- 输入框 -->
     <textarea class="user-introduction"></textarea>

     <!-- 确认按钮 -->
     <div class="userinfo-btn">
       <van-button square type="primary" color="#cacaca" size="small">确认</van-button>
     </div>
     

  </div>
</template>

<script>
export default {
  name:'userInfo',
  data(){
    return {
      userInfo:{
        headIcon:'1',
        petName:'2',
        introduction:'3',
        userSex:'4',
        userBirthday:'5',
      }
    }
  },
  methods:{
    onSubmitPersonMsg () {
      // 1.发送请求，保存数据到线上

      // 2.路由跳转到 /mypage
      this.$router.push('/mypage')
    }
  }
}
</script>

<style lang="less" scoped>
  .userInfo-container{
    .right-text{
      color:#fff;
      font-size: 28px;
    }
    .user-introduction{
      width: 686px;
      height: 200px;
      border:1px solid #d8d8d8;
      margin-left: 30px;
      margin-top: 29px;
    }
    .userinfo-btn{
      margin-left: 85%;
    }
  }
</style>