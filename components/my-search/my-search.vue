<template>
	<view class="search-container" :style="{'background-color':bgcolor}"@click="searchClickHandler">
    <view class="search-box" :style="{'border-radius':radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      searchClickHandler(){
        this.$emit("click")
      }
    },
    // props
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
    }
	}
</script>

<style lang="scss">
.search-container {
  background-color: #C00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.search-box {
  height: 36px;
  background-color: #FFFFFF;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder {
  font-size: 15px;
  margin-left: 5px;
}
</style>
