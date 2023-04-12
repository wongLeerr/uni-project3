<template>
	<view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address)=='{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress1">请选择收货地址 +</button>
    </view>
    <!-- 渲染收货地址的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress1">
      <!-- 收货人这一行 -->
      <view class="row1">
        <!--  -->
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话： <text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size=16""></uni-icons>
        </view>
      </view>
      <!-- 收货地址这一行 -->
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{address.provinceName}}{{address.cityName}}{{address.countyName}}{{address.detailInfo}}</view>
      </view>
    </view>
    <!-- 底部边框线使用图片实现 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
			};
		},
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      // 点击添加收货地址的回调函数
     async chooseAddress1(){
        // 调用uni-ui提供的接口
      let result= await uni.chooseAddress().catch(err=>err)
      // 用户授权了地理位置，那就将地址信息返回给用户
      if(result[0]==null && result[1].errMsg=="chooseAddress:ok"){
        // 将数据存储至vuex
        this.updateAddress(result[1])
      }
      // 用户拒绝授权，那就重新询问用户是否要进行授权
      if(result[0] && result[0].errMsg=="chooseAddress:fail auth deny"){
        // 授权
        this.reAuth()
      }
      },
      // 授权
     async reAuth(){
      let [err2,confirmResult] = await uni.showModal({
          content:"检测你没打开地址权限,是否去设置打开？",
          confirmText:"确认",
          cancelText:"取消",
        })
        
        // 如果弹框异常，直接退出
        if(err2) return 
        
        // 如果点击了取消按钮，提示用户
        if(confirmResult.cancel) return uni.$showMsg("你取消了地址授权")
        
        // 如果点击了确定按钮，则进入授权页面进行授权
        if(confirmResult.confirm) return uni.openSetting({
          success:(settingResult) => {
            // 用户点击了授权
            if(settingResult.authSetting['scope.address'])  return uni.$showMsg("授权成功，请选择地址")
            // 用户点击了取消授权
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg("你取消了地址授权!")
          }
        })
      }
      // ...
    },
    computed:{
      ...mapState('m_user',['address'])
    }
	}
</script>

<style lang="scss">
.address-border {
    display: block;
    width: 100%;
    height: 5px;
}
.address-choose-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-right {
      display: flex;
      justify-content: space-between;
    }
  }
  .row2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .row2-left {
      white-space: nowrap;
      margin-right: 5px;
    }
  }
}
</style>
