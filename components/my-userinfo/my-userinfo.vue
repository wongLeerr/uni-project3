<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
    <view class="top-box">
      <image class="avatar" :src="userInfo.avatarUrl"></image>
      <view class="nickname">WongLeer</view>
    </view>
    <!-- 面板列表区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <!-- panel主体区域 -->
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon"  ></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon" ></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon" ></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        
      </view>
    </view>
	</view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      ...mapState('m_user',['userInfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      // 退出登录的回调函数
     async logout(){
        // 弹框询问是否确认退出登录
         let [err,succ]=await uni.showModal({
            title:"提示",
            content:"确认退出登录吗？"
          }).catch(err=>err)
         // 用户点击的是确认按钮
         if(succ && succ.confirm){
           // 清空vuex中关于用的token,userInfo,address
           this.updateToken('')
           this.updateUserInfo({})
           this.updateAddress({})
         }
      }
    }
	}
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #F4F4F4;
  .top-box {
    height: 400rpx;
    background-color: #C00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      margin-top: 10px;
      font-size: 16px;
      color: #FFFFFF;
      font-weight: bold;
    }
  }
}
.panel-list {
  padding: 0 10px;
  position: relative;
  top: -10px;
  .panel {
    background-color: white;
    border-radius: 3px;
    margin-bottom: 8px;
    .panel-title {
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }
    .panel-list-item {
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 15px;
    }
    .panel-body {
      display: flex;
      justify-content: space-around;
      .panel-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        
        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}
</style>
