<!-- 频道编辑组件 -->
<template>
<div class='channel-edit'>
    <!-- 我的频道  -->
    <van-cell :border="false">
        <span slot="title" class="channel-title">我的频道</span>
        <span slot="default">
            <van-button 
              round 
              plain 
              type="primary" 
              class="channel-edit-btn"
              @click="isEdit = !isEdit"
              >
              {{isEdit ? '完成' : '编辑'}}
              </van-button>
        </span>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel,index) in myChannels" 
          :key="index" 
          @click="handleChange(channel,index)"
        >
            <van-icon
             v-show="isEdit && !fixedchannels.includes(channel.id)"
             slot="icon" 
             name="clear"
            @click="handleDelete(channel,index)" 
            >
            </van-icon>
            <!-- v-bind:class语法 -->
            <!-- class样式控制样式是否显示 -->
            <span 
              class="text"
              :class="{active : index === activeChanel}"
              slot="text"
            >
              {{channel.name}}
            </span>
        </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
        <span slot="title" class="channel-title">频道推荐</span>
    </van-cell>
    <van-grid :gutter="10"  class="recomend-grid">
        <van-grid-item
          icon="plus"
          class="grid-item"
          v-for="(channel,index) in recomendChannels"  
          :key="index" 
          :text="channel.name"
          @click="onAddChannel(channel)" 
        />
    </van-grid>
    <!-- 频道推荐 -->

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { GetAllChannels, addUserChannels } from '@/api/channel'

import { mapState } from 'vuex' 

import { setItem } from '@/utils/storage' 
export default {
name:'ChannelEdit',
// 从home组件传递过来的数据
props:{
    myChannels:{
        type: Array,
        required:true
    },
    activeChanel:{
        type:Number,
        required:true
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    allChannels:[], // 所有频道列表
    isEdit:false, // 控制编辑状态显示
    fixedchannels:[0], // 固定频道不允许删除,数组内是推荐频道的id
};
},
//监听属性 类似于data概念
computed: {
    // 映射 vuex中的数据 user 
    ...mapState(['user']),
    // 计算属性会观测内部依赖的数据，内部数据发生变化，会重新变化
    // 推荐频道列表 数组的filter方法，把符合条件的元素，存储到新数组中，返回新数组
    recomendChannels() {
        return this.allChannels.filter(item=>{
            return !this.myChannels.find(mychannel =>{
                return mychannel.id === item.id
            })
        })
    }
   /*  // 推荐频道列表方法二
    recomendChannels() {
        const channels = []
        this.allChannels.forEach(channel =>{
            // find() 遍历数据，把符合条件的第一个元素返回
            const ret = this.myChannels.find(myChannel =>{
                // 此处返回myChannel
                 return myChannel.id === channel.id
            })
            // 如果频道中不包括该频道项，则收集到推荐频道中
            if(!ret){
                channels.push(channel)
            }
        })
        // 把计算结果返回
        return channels
    } */
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async loadAllChannels(){
        try {
            const {data} = await GetAllChannels()
            console.log(data)
            this.allChannels = data.data.channels
        } catch (err) {
            this.$toast('数据获取失败')
        }
    },
    // 添加频道
    async onAddChannel(channel){
        console.log(channel)
        this.myChannels.push(channel)
        // 数据持久化
        // 未登录，存储在本地
        if (this.user) {
            try {
                // 已经登录，请求到线上
                await addUserChannels({
                    id: channel.id, // 频道id
                    seq: this.myChannels.length // 序号
                })
            } catch (err) {
                this.$toast('保存失败')
            }
        }else {
            // 没有登录，存储到本地
            setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
        // 登录，把数据请求接口放到线上
    },
    // 删除频道传递数据(通过全局事件总线实现数据传递)
    handleDelete(channel,index){
        // 编辑状态删除频道
        if(this.isEdit){
            this.$bus.$emit('deleteChannel',channel,index)
        }
    },
    // 切换频道传递数据(通过全局事件总线实现数据传递)
    handleChange(channel,index){
        console.log(channel)
        // 非编辑状态切换频道
        if(!this.isEdit){
            this.$bus.$emit('changeChannel',index,false)
        }  
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.loadAllChannels()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {},
beforeUpdate() {}, //生命周期 - 更新之前
beforeDestroy() {}, //生命周期 - 销毁之前
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
    .channel-edit {
        margin: 1.1333rem 0;
        .my-channel-title{
            font-size: .4267rem;
            color:#333;
        }
        .channel-edit-btn{
            width: 1.3867rem;
            height: .64rem;
            font-size: .3467rem;
            color:#f86363;
            border: .0133rem solid #f86363;
            z-index: 99;
        }
        .van-button--normal{
            padding:0;
        }
        /deep/.grid-item{
            width: 2.1333rem;
            height: 1.16rem;
            .van-grid-item__content {
                white-space: nowrap;
                background-color: #f4f5f6;
                .van-grid-item__text,.text {
                    font-size: .3733rem;
                    color: #222;
                    margin: 0;
                }
                .active {
                    color:red
                }
            }
        }
        /deep/.recomend-grid {
            .grid-item {
                .van-grid-item__content {
                    flex-direction: row;
                    .van-icon-plus {
                        font-size: .3733rem;
                        padding-right: .08rem;
                    }
                }
            }
        }
        /deep/.my-grid {
            .grid-item {
                .van-grid-item__icon-wrapper{
                    position: unset;
                    .van-icon-clear {
                        position: absolute;
                        top: -0.1333rem;
                        right: -0.1333rem;
                        font-size: .4rem;
                        color: #cacaca;
                        z-index: 2;
                    }
                }
            }
        }
    }
</style>