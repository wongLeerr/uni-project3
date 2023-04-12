<template>
	<view class="cart-container" v-if="cart.length!==0">
    <my-address></my-address>
    <view class="cart-title">
      <!-- 左侧购物logo -->
      <uni-icons type="shop" size=18""></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods,index) in cart" :key="index">
      <uni-swipe-action-item :options="options" @click="swiperActionClickHandler(goods)">
        <my-goods :goods="goods" :showRadio="true" :showNum="true"  @radio-change="radionChangeHandler" @num-change="numChangeHandler"  ></my-goods>
      </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算模块（固定在页面的最底部） -->
    <my-settle></my-settle>
	</view>
  <view class="empty-cart" v-else>
    <image src="/static/bgc/cart_empty@2x.png"class="empty-img"></image>
    <text>空空如也~</text>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				options:[
          {
            text:"删除",
            style:{
             backgroundColor:"#C00000"
            }
          }
        ]
			};
		},
    mixins:[badgeMix],
    methods:{
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsNum','deleteItem']),
      // 选中按钮发生变化的回调
      radionChangeHandler({goods_id,goods_state}){
      this.updateGoodsState({goods_id,goods_state})
      },
      // 商品数量发生变化的回调
      numChangeHandler(e){
        console.log(e);
        this.updateGoodsNum(e)
      },
      // 滑动效果的处理函数
      swiperActionClickHandler(goods){
        // 在这里要将点击删除的那一项从vuex和本地存储当中清空
        this.deleteItem(goods.goods_id)
        // console.log(goods);
      },
      // ...
    },
    computed:{
      ...mapState('m_cart',['cart'])
    }
    
	}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    margin-top: 100px;
    margin-bottom: 20px;
    width: 100px;
    height: 100px;
  }
  text {
    font-size: 12px;
    color: gray;
  }
}
</style>
