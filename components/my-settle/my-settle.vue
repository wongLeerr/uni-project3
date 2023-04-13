<template>
	<view> 
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllChecked">
      <radio :checked="isAllChecked"  color="#C00000" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
     合计： <text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
	</view>
</template>

<script>
  import { mapGetters ,mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
        // 倒计时的秒数
				seconds:3
			}
		},
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllChecked(){
        // 获取当前按钮是否被选中
        this.updateAllGoodsState(!this.isAllChecked)
      },
      // 结算按钮的回调
      settlement(){
        console.log("结算");
        // 判断是否有选中的商品，若没有则提示
        if(this.checkedCount==0) return uni.$showMsg("请选择你想要购买的商品!");
        // 判断是否选择收货地址，若没有则提示
        if(JSON.stringify(this.address)=="{}") return uni.$showMsg("请选择收货地址!");
        // 如果本地没有token，则表示用户没有登录，需要让用户首先进行登录
        if(this.token=="")  return this.delayNavigate()
        // 如果可以走到这一步，证明可以传参跳转至支付相关页面了
        this.payOrder()
      },
      // 展示倒计时的提示消息
      showTips(n){
        uni.showToast({
          icon:'none',
          title:"请登录后再结算! "+n+" 秒后自动跳转到登录页",
          // 为页面添加遮罩层，防止点击穿透
          mask:true,
          duration:1100
        })
      },
      // 延迟导航到my页面
      delayNavigate(){
        this.seconds=3
        this.showTips(this.seconds)
       let timer = setInterval(() => {
          this.seconds--;
          if(this.seconds<=0){
            clearInterval(timer)
            uni.switchTab({
              url:'/pages/my/my'
            })
            return 
          }
          
          this.showTips(this.seconds)
        },1000)
      },
      // 点击结算按钮的回调函数
     async payOrder(){
        // 准备一个orderInfo对象，将此订单对象交给服务器，服务器会返回一个订单编号
        const orderInfo={
          order_price:0.01,
          consignee_addr:this.address,
          goods:this.cart.filter(x=>x.goods_state).map(x=>({goods_id:x.goods_id,goods_number:x.goods_count,goods_price:x.goods_price}))
        }
        // 发请求
      let {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
      if(res.meta.status!=401) return uni.$showMsg("订单创建失败")
      // 得到服务器相应的订单编号
      // const orderNumber=res.message.order_number;
      const orderNumber="HMDD20200901000000001949"
      // 发起请求获取订单的支付信息
      let {data:res2}  =await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
      if(res.meta.status!=401) return uni.$showMsg("预支付订单生成失败")
      // const payInfo=res2.message.pay
      // console.log(payInfo);
      uni.showToast({
        title:"支付成功",
        icon:"success"
      })
      }
      // ...
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      ...mapState('m_cart',['cart']),
      ...mapState('m_user',['address','token']),
      isAllChecked(){
        return this.total == this.checkedCount
      }
    }
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  // background-color: skyblue;
  background-color: #fff;
  height: 50px;
  width: 100%;
}
.my-settle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
    // color: #C00000;
  }
  .amount-box {
    .amount {
      color: #c00000;
      font-weight: bold;
    }
  }
  .btn-settle {
    width: 120px;
    height: 50px;
    background-color: #C00000;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
}
</style>
