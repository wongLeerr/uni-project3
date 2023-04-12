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
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
	</view>
</template>

<script>
  import { mapGetters ,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllChecked(){
        // 获取当前按钮是否被选中
        this.updateAllGoodsState(!this.isAllChecked)
      }
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
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
