<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
      title="登录/注册"
    >
      <van-icon slot="left" name="cross" size="" @click="$router.back()"></van-icon>
    </van-nav-bar>
    
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
     <van-field
       v-model="user.mobile"
       name="mobile"
       placeholder="请输入手机号"
       :rules="userFormRules.mobile"
       type="number"
       maxlength="11"
     >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
     </van-field>

     <van-field
       v-model="user.code"
       name="code"
       placeholder="请输入验证码"
       :rules="userFormRules.code"
       type="number"
       maxlength="6"
     >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>

      <template #button>
        <!-- time倒计时时长 -->
        <van-count-down 
        v-show="isCountDownShow"
        :time="1000 * 60" 
        format="ss s"
        @finish="isCountDownShow = false"
        />

        <van-button 
        v-show="!isCountDownShow"
        class="send-sms-btn" 
        round 
        size="small" 
        type="default"
        native-type="button"
        @click="onSendSms"
        >发送验证码
        </van-button>
      </template>
     </van-field>

     <div class="login-btn-wrap">
       <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
     </div>
    </van-form>
  </div>
</template>

<script>
import { UserLogin,SendSms } from '@/api/user'

export default {
    name:'loginIndex',
    data(){
     return {
         user: {
             mobile:'',
             code:''
         },
         userFormRules:{
           mobile:[{ 
             required: true, 
             message: '手机号码不能为空'
             },
             {
               pattern:/^1[3|5|7|8]\d{9}$/,
               message: '手机号码格式错误'
             }
             ],
           code:[{ 
             required: true, 
             message: '请填写验证码' 
             },{
               pattern:/^\d{6}$/,
               message:'验证码格式错误'
             }
             ]
         },
         isCountDownShow:false  // 控制倒计时是否展示
    };
    },
    methods:{
     async onSubmit() {
   
      // 1.获取表单数据
        //  const user = this.user
      // 2.表单验证 todo
      // 在组件中调用方法，必须使用this.$Toast
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true, // 禁用背景点击
          duration:0 // 持续时间，默认2000毫秒，如果是0 持续展示
        })
      // 3. 提交表单申请登录
        try {
            const {data} = await UserLogin(this.user) 
            this.$store.commit('setUser',data.data)
            this.$toast.success('登录成功')
            this.$router.push('/mypage')
        } catch (err) {
            if(err.response.status === 400) {
                this.$toast.fail('手机或者验证码错误')
            }else {
                this.$toast.fail('登录失败，请稍微重试')
            }
            
        }
      // 4.根据请求响应结果处理后续操作
     },
     async onSendSms(){
       // 1.校验手机号
       try {
         // validate 方法 通过 name 属性 验证 指定表单
         await this.$refs.loginForm.validate('mobile')
         console.log('验证通过')
       } catch (err) {
         return console.log('验证失败',err)
       }
       
       // 2.验证通过，显示倒计时
       this.isCountDownShow = true 
       // 3.请求发送验证码
       try {
         await SendSms(this.user.mobile)
         this.$toast('发送成功')
       } catch (err) {
         this.isCountDownShow = false
         if(err.response.status === 429){
           this.$toast('获取太频繁,请稍后重试')
         }else{
           this.$toast('发送失败，请稍后重试')
         }
       }
     }
    }
}
</script>

<style scoped lang="less">
    .login-container {
        .iconfont {
            font-size: 37px;
        }
        .send-sms-btn {
            background-color: #ededed;
            width: 22vw;
            height: 46px;
            line-height: 46px;
            font-size: 22px;
            color:#666;
        }
        .login-btn-wrap {
            padding: 53px 33px;
            .login-btn {
                background-color: #6db4fb;
                border:none;
            }
        }
        .van-button__text {
          font-size: 2.93vw;
          color:red
        }
    }
</style>