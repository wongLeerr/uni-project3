<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
    
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index" >
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 价格区域 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品介绍 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 商品收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="grey"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递:免运费</view>
    </view>
    
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    
    <!-- 商品导航区 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情对象
        goods_info:{
          
        },
        // 商品导航区域
        options: [
          {
        			icon: 'shop',
        			text: '店铺',
        		}, {
        			icon: 'cart',
        			text: '购物车',
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ],
          
			};
		},
    // methods
    methods:{
      // 获取商品详情页信息
     async getGoodsDetail(goods_id){
        let result= await   uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(result.data.meta.status!==200) return uni.$showMsg()
        // 将数据进行处理
        result.data.message.goods_introduce=result.data.message.goods_introduce.replace(/img /g,'img style="display:block;" ')
        this.goods_info=result.data.message
      },
      // 预览图片的效果
      preview(index){
        uni.previewImage({
          // 就预览index索引的这张图
          current:index,
          // 图片地址在哪呢(urls是一个数组,里面保存者这些图片的地址)
          urls:this.goods_info.pics.map(x=>x.pics_big)
          
        })
      },
      // 响应左侧两个按钮的点击事件
      onClick(e) {
        console.log(e);
        if(e.content.text=="购物车"){
          uni.switchTab({
            url:"/pages/cart/cart"
          })
        }
     },
      // 响应右侧两个按钮的点击事件
      buttonClick(e) {
      	    console.log(e)
    }
      // ...
    },
    // onLoad
    onLoad(options){
      // 获取从其他页面带过来的参数goods_id
      const goods_id=options.goods_id;
      // 发起网络请求
      this.getGoodsDetail(goods_id);
    }
	}
</script>

<style lang="scss">
swiper {
  height:750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px 0 10px 10px;
  .price {
    color: #C00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      margin-right: 10px;
    }
    .favi {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color:gray;
      width: 120px;
      font-size: 12px;
    }
  }
  
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}
.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail-container {
  padding-bottom: 50px;
}
</style>
