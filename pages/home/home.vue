<template>
	<view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id"><image :src="item.image_src"></image></navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="navList">
      <view v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image  class="navImg" :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floorArea">
      <view class="floorItem" v-for="(item,index) in floorList" :key="index">
          <image class="floor-title" :src="item.floor_title.image_src"></image>
        <view class="floor-body">
          <navigator class="body-left":url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width +'rpx'}"></image>
          </navigator>
          <view class="body-right">
            <navigator class="right-img" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0"  :url="item2.url">
              <image :src="item2.image_src" mode="widthFix":style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <!-- ... -->
	</view>
</template>

<script>

	export default {
		data() {
			return {
         swiperList:[],
         navList:[],
         floorList:[]
			};
		},
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList();
    },
    methods:{
      // 获取轮播图数据
     async getSwiperList(){
     const {data:res}=  await uni.$http.get('/api/public/v1/home/swiperdata');
     if(res.meta.status!==200){
       return  uni.$showMsg()
     }
     this.swiperList=res.message;
      },
      
      // 获取商品导航列表
     async getNavList(){
      let result= await uni.$http.get('/api/public/v1/home/catitems');
      if(result.data.meta.status!==200) return uni.$showMsg()
      
      this.navList=result.data.message
      },
      
      // 处理导航分类图片点击的事件
      navClickHandler(item){
        if(item.name=="分类"){
          uni.switchTab({
              url:'/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据
     async getFloorList(){
      let result= await uni.$http.get('/api/public/v1/home/floordata');
      if(result.data.meta.status!==200) return uni.$showMsg()
      // 对数据进行处理
      result.data.message.forEach((item) => {
        item.product_list.forEach((item2) => {
          item2.url='/subpkg/goods_list/goods_list?'+item2.navigator_url.split('?')[1]
        })
      })
      this.floorList=result.data.message
      }
      
      // ...
      },
      
    }
    
    
</script>

<style lang="scss">
  // 轮播图
swiper {
  height: 330rpx;
  .swiper-item,image {
    width: 100%;
    height: 100%;
  }
}
  // 分类导航
   .navList {
     // width: 750rpx;
     display: flex;
     justify-content: space-around;
     margin: 15px 0;
     .navImg {
       width: 128rpx;
       height: 140rpx;
     }
   }
   // 楼层区域
   .floor-title {
     height: 60rpx;
     width: 100%;
   }
   .floor-body {
     display: flex;
     margin-left: 10rpx;
   }
   .body-right {
     display: flex;
     justify-content: space-around;
     flex-wrap: wrap;
   }
</style>
