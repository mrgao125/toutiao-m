<!-- 搜索历史 -->
<template>
    <div class='search-history'>
        <van-cell title="搜索历史">
            <div v-show="isDeleteShow">
                <span class="delete-btn" @click="$emit('clear-search-history', [])">全部删除</span>
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon 
                name="delete-o" 
                v-show="!isDeleteShow"
                @click="isDeleteShow = true"
            />
        </van-cell>

        <van-cell
          :title="history"
          v-for="(history,index) in searchHistories"
          :key="index"
          @click="onSearchItemClick(history,index)"
        >
            <van-icon name="close" v-show="isDeleteShow"/>
        </van-cell>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
name:'SearchHistory',
props:{
    // props如果是普通数据，字符串，布尔值，数字，不能修改，即便改了也不会传递给父组件
    // 如果是引用类型数据，数组，对象类型， 可以修改，例如 [].push  不能重新赋值
    searchHistories:{
        type:Array,
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    isDeleteShow:false   // 控制删除键显示状态
}
},
//监听属性 类似于data概念
computed: {

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onSearchItemClick (history,index) {
        if (!this.isDeleteShow) {
            // 非删除状态进行搜索
            this.$emit('search',history)
        }else{
            // 删除状态进行删除操作
            // 修改props  数组 对象类型数据
            this.searchHistories.splice(index,1)
        }
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
  .search-history{
    .delete-btn{
        padding-right: 10px;
    }
  }

</style>