<template>
	<view>
		    <view class="goods-item">
		      <!-- 左侧区域 -->
		      <view class="goods-item-left">
            <radio v-if="showRadio" :checked="goods.goods_state" color="#C00000" @click="radioClickHandler(goods)"></radio>
		        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		      </view>
		      <!-- 右侧区域 -->
		      <view class="goods-item-right">
		        <!-- 标题区 -->
		        <view class="goods-name">{{goods.goods_name}}</view>
		        <!-- 商品价格区 -->
		        <view class="goods-info-box">
              <!-- 商品价格 -->
		          <view class="goods-price">￥{{goods.goods_price | finPrice}}</view>
              <!-- 商品数量 -->
              <uni-number-box @change="numChangeHandler" v-if="showNum" :min="1" :value="goods.goods_count"></uni-number-box>
		        </view>
		      </view>
		    </view>
	</view>
</template>

<script>
	export default {
    filters:{
      finPrice(price){
        return Number(price).toFixed(2)
      }
    },
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
      
    },
		data() {
			return {
        // 默认图片
        defaultPic:'https://cn.bing.com/images/search?view=detailV2&ccid=uxjZdohr&id=BBB42B43B5936E4A362AB7B05EA3EFF65EABD571&thid=OIP.uxjZdohr18bpdGrp-YhNAQHaHT&mediaurl=https%3a%2f%2fuploadfile.bizhizu.cn%2f2015%2f0518%2f20150518032433289.jpg&exph=988&expw=1002&q=%e6%87%92%e6%b4%8b%e6%b4%8b%e5%9b%be%e7%89%87&simid=608046784095138084&FORM=IRPRST&ck=4075F367935DE65A7E9D52574DD0F4EF&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0'
			};
		},
    // methods
    methods:{
      // 选中按钮发生变化的回调
      radioClickHandler(goods){
        // 触发
        // if(goods.goods_state){
          let goodss={
            goods_id:goods.goods_id,
            goods_state:!goods.goods_state
          }
          this.$emit('radio-change',goodss)
      },
      // 商品数量发生变化的回调
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
        
      }
    }
	}
</script>

<style lang="scss">
.goods-item{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>

