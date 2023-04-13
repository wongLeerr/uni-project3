<template>
	<view class="login-container">
    <!-- logo -->
    <uni-icons type="contact-filled" size="100" color=#AFAFAF""></uni-icons>
    <!-- button -->
    <!-- 这里为一键登录按钮绑定的  open-type="getUserInfo" @getuserinfo="getUserInfo属性是固定的写法，这表明当用户点击此按钮时会打开一个用户授权的对话框，当用户点击确定或者取消授权之后，会执行我们绑定的getUserInfo回调函数-->
    <!--   -->
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <!-- tips -->
    <view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
  import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken']),
      // 点击一键登录按钮的回调函数
      getUserInfo(e){
        console.log("一键登录");
        console.log(e);
        // console.log("一键登录");
        // console.log(e);
        if(e.detail.errMsg=="getUserInfo:fail auth deny") return uni.$showMsg("您取消了授权")
        
        // 存储用户数据至仓库当中
        this.updateUserInfo(e.detail.userInfo)
        console.log(e.detail.userInfo);
        // 调用获取token的方法
        this.getToken(e.detail)
      },
      async  getToken(info){
        let [err,res] = await uni.login().catch(err=>err)
        console.log(res);
          if(res.errMsg !='login:ok') return uni.$showMsg("登录失败!")
        
        // 准备参数对象
        const query={
          code:res.code,
          encryptedData:info.encryptedData,
          iv:info.iv,
          rawData:info.rawData,
          signature:info.signature
        }
         // 获取token
         const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
         console.log(loginResult);
         if(loginResult.meta.status ==200) return uni.$showMsg("登录失败!")
         this.updateToken("wanglelelehahaha")
         // 实现三秒之内跳转页面
         uni.$showMsg("登录成功")
         uni.switchTab({
           url:"/pages/cart/cart"
         })
      },
      
      // ...
      
    }
	}
</script>

<style lang="scss">
.login-container {
  height: 350px;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow:hidden;
  &::after {
    content: " ";
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius:100% ;
    transform: translateY(50%);
  }
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
