<template>
	<view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100"cancelButton="none"></uni-search-bar>
    </view>
    <!-- 联想词列表 -->
    <view class="sugg-list" v-if="searchResults.length!=0">
      <view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)" ></uni-tag>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定时器
        timer:null,
        // 关键字
        kw:"",
        // 关键字联想数据
        searchResults:[],
        // 搜索历史信息
        historyList:['球鞋','乒乓球拍']
			};
		},
    methods:{
      // 用户输入事件
      input({value:keywords}){
        if(this.timer){
          clearTimeout(this.timer)
        }
       this.timer= setTimeout(() => {
          // ...
          this.kw=keywords
          // 发起网络请求获取联想数据
          this.getSearchData()
        },500)
        // console.log(keywords);
      },
      // 获取关键字联想数据
     async getSearchData(){
       if(this.kw==''){
         this.searchResults=[]
         return
       } 
      let result= await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
      if(result.data.meta.status!==200) return uni.$showMsg()
      this.searchResults=result.data.message
      
      // 添加搜索历史
      this.saveSearchHistory();
      },
      // 搜索建议列表的点击事件
      gotoDetail(id){
        console.log(id);
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+id
        })
      },
      // 添加搜索历史
      saveSearchHistory(){
        let set=new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
       this.historyList= Array.from(set)
       // 将数据持久化存储
       uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 清空历史记录
      cleanHistory(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?query="+kw
        })
      }
      // ...
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    // 页面加载钩子
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    }
	}
</script>

<style lang="scss">
.search-box {
  background-color: red;
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
  
}
.history-box {
    padding: 0 5px;
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      line-height: 40px;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
