<!-- 收藏组件 -->
<template>
    <div class='collect-article'>
        <van-button
          v-if="isCollected" 
          type="default"
          :loading="isLoading"
          @click="onCollection"
        >
            <van-icon name="star" />
        </van-button>

        <van-button
          v-else
          :loading="isLoading"
          type="default"
          @click="onCollection"
        >
            <van-icon name="star-o" />
        </van-button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { addCollection, deleteCollection } from '@/api/user'

export default {
name:'CollectArticle',
model:{
    prop: 'isCollected',
    event: 'changeCollection'
},
props: {
    isCollected: {
        type: Boolean,
        required:true
    },
    articleId: {
        type:[Number, String, Object],
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    isLoading: false  // 控制点击收藏 加载状态
}
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async onCollection () {
        // 初始化loading状态
        this.isLoading = true   
        try {
            if (this.isCollected) {
                // 点击发送取消收藏请求
                const { data } = await deleteCollection(this.articleId)
            }else {
                const { data } = await addCollection(this.articleId)
            }

            // 更新视图
            this.$emit('changeCollection', !this.isCollected)

            // 收藏提示
            this.$toast.success(this.isCollected ? '取消收藏' : '收藏成功')
        } catch (error) {
            this.$toast.fail('收藏失败，请重试')
        }
        
        
        // 请求结束改变加载状态
        this.isLoading = false 
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