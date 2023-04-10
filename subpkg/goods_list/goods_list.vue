<template>
	<view>
    <!-- 大容器,包含所有 -->
    <view class="goods-list">
    <view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods.goods_id)">
      <my-goods :goods="goods"></my-goods>
    </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 请求参数对象
        queryObj:{
          // 查询关键字
          query:'',
          // 商品分类id
          cid:'',
          // 页码值
          pageNum:1,
          // 每页展示多少条数据
          pageSize:10
        },
        // 商品列表数量
        total:0,
        // 商品列表数据
        goodsList:[],
        // 节流阀
        isLoading:false
			};
		},
    // methods
    methods:{
      // 发请求获取商品列表数据
     async getGoodsList(cb){
       // 打开节流阀
     this.isLoading=true
     let result= await  uni.$http.get('/api/public/v1/goods/search',this.queryObj)
     // 关闭节流阀
     this.isLoading=false
     cb && cb()
     if(result.data.meta.status!==200) return uni.$showMsg()
     this.goodsList=[...this.goodsList,...result.data.message.goods]
     this.total=result.data.message.total
     console.log(result);
      },
      // 点击item项跳往商品详情页
      gotoDetail(id){
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+ id
        })
      }
    },
    // 下拉刷新事件
    onPullDownRefresh(){
      this.queryObj.pageNum=1;
      this.total=0;
      this.goodsList=[],
      this.isLoading=false;
      
      // 重写发起请求
      this.getGoodsList(() => {
        return uni.stopPullDownRefresh()
      })
    },
    // onReachBottom
    onReachBottom(){
      // 判断是否数据加载完毕
      if(this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg("数据加载完毕!")
      // 让页码自增加 1
      this.queryObj.pageNum+=1;
      // 重新获取数据
      if(this.isLoading) return 
      this.getGoodsList()
    },
    // onLoad
    onLoad(options){
      // 页面发生跳转时将query参数和cid进行赋值
      this.queryObj.query = options.query || '';
      this.queryObj.cid = options.cid || '';
      console.log('queryObj',this.queryObj);
      // 发起网络请求
      this.getGoodsList()
    }
    // onLoad
	}
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box {
      .goods-price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>
