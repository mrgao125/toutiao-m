<!-- 搜索建议 -->
<template>
<div class='search-suggestion'>
    <van-cell
      v-for="(text,index) in suggestionList"
      :key="index"
      @click="search(text)"
      >
        <span slot="title" v-html="hightLight(text)"></span>
        <span slot="icon" class="iconfont icon-sousuo"></span>
    </van-cell>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

// 按需 引入 处理防抖的 包
import {debounce} from 'lodash'

import {getSugestions} from '@/api/search'
export default {
name:'SearchSuggestion',
props:{
    searchText: {
        type:String,
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    suggestionList:[],  // 联想建议数据
    htmlStr:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    searchText:{
        // 当searchText发生变化
        // debounce(参数1，参数2) 函数 
        // 参数1  一个函数 
        // 参数2 延迟时间
        // 返回值，防抖后的函数
        // handler (val) {
        //     this.loadSugestions(val)
        // },
        handler : debounce(function(val){
            this.loadSugestions(val)
        },200),
        immediate: true
    }
},
//方法集合
methods: {
    // 发送请求
    async loadSugestions (q) {
        try {
            const {data} = await getSugestions(q)
            // console.log(data)
            const results = data.data.options
            if(results.length){
                this.suggestionList = results
            }                            
        } catch (err) {
            this.$toast('数据获取失败')
        }        
    },
    // 控制搜索关键词高亮
    hightLight(text) {
        if(text){
            let hightLightStr = `<span class="searchStr">${this.searchText}</span>`

            // 正则表达式， // 中的内容，会当成匹配字符使用，不能使用变量
            // 如果需要根据数据变量，动态创建正则表达式，则手动new RegExp
            // RegExp 正则原生 构造函数，
                // 参数1 : 匹配模式字符串，它会根据这个字符串创建正则对象
                // 参数2 ：匹配模式，要写的字符串中
            let reg = new RegExp(this.searchText,'gi')     // 动态创建正则表达式
        
            return text.replace(reg, hightLightStr)   // replace方法返回新的字符串，不改变原数据
        }
    },
    search(text){
        if(text){
            this.$emit('search',text)
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
    .search-suggestion {
        .iconfont {
            font-size: 23px;
            margin-right: 15px;
        }
        /deep/.searchStr {
            color:red;
        }
    }
</style>