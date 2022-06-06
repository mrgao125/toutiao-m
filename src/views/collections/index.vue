<!-- 收藏列表组件 -->
<template>
    <div class='collections-container'>
      <!-- 收藏导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        title="收藏/历史"
      >
        <span slot="left">
          <van-icon name="arrow-left" @click="$router.back()"></van-icon>
        </span>
      </van-nav-bar>
      <!-- 收藏导航栏 -->

      <!-- 收藏/历史标签页 -->
      <van-tabs v-model="active">
        <van-tab title="我的收藏">
            收藏内容
        </van-tab>
        <van-tab title="我的历史">
            历史内容
        </van-tab>
      </van-tabs>
      <!-- 收藏/历史标签页 -->
        
      <!-- 收藏列表 子组件 -->
        <collections-list />
      <!-- 收藏列表 子组件 -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CollectionsList from '@/views/collections/components/collectionsList.vue'

export default {
name:'CollectionsIndex',
//import引入的组件需要注入到对象中才能使用
components: { CollectionsList },
data() {
//这里存放数据
return {
    active: 0  // 控制展示收藏或历史标签页
}
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

</style>