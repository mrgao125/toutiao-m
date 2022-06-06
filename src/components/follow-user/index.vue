<!-- 关注用户组件 -->
<template>
    <!-- v-if  v-else 渲染页面  vue中 只算一个根节点 -->
    <van-button
        v-if="!isFollowed"
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
        size="small"
        :loading="followLoading"
        @click="onFollowing"
    >
        已关注
    </van-button>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Userfollowings, deleteFollowings } from '@/api/user'
export default {
name:'FollowUser',
// 修改v-model   prop名称和事件名称
model:{
    prop:'isFollowed',
    event:'changeFollow'
},
props:{
    isFollowed:{
        type:Boolean,
        required:true
    },
    userId:{
        type:[Number, String, Object],
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    followLoading: false  // 关注按钮 加载状态
}
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
// 关注用户 和 取消关注 请求
  async onFollowing () {
    // 开启 关注 按钮 加载状态
    this.followLoading = true
    try {
      if (this.isFollowed) {
        // 已关注，点击请求取消关注
        const { data } = await deleteFollowings(this.userId)
      }else {
        // 未关注，点击请求关注
        const { data } = await Userfollowings(this.userId)
      }
      // isFollowed 取反 控制 关注 和 已关注 按钮视图显示 input 事件是v-model自带的
      // 
      this.$emit('changeFollow', !this.isFollowed)
    } catch (err) {
      let msg = '操作失败,请重试'
      if(err.response && err.response.status === 400) {
        msg = '用户不能关注自己'
      }
      this.$toast(msg)
    }

    // 关闭 关注按钮加载状态
    this.followLoading = false
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

</style>