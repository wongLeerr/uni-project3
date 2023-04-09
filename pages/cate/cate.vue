<template>
	<view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view @click="activeChange" class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}" >
        <block v-for="(item,index) in cateList" :key="index">
          <view :id="index" :class="['left-scroll-view-item',index===active ? 'active' : '']">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item,index) in cateLevel2" :key="index">
          <!-- 二级分类标题展示 -->
          <view class="cate-lv2-title">/ {{item.cat_name}} /</view>
          <!-- 三级分类展示 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item2,index2) in item.children" :key="index2" @click="gotoGoodsList(item2)">
              <!-- 图片 -->
              <image :src="item2.cat_icon.replace('dev', 'web')" mode=""></image>
              <!-- 文本 -->
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用的高度
        wh:0,
        // 一级分类列表数据
        cateList:[],
        // 二级分类列表数据
        cateLevel2:[],
        // 激活哪一项
        active:0,
        // 距离顶部的距离
        scrollTop:0
			};
		},
    methods:{
      // 获取分类列表的方法
     async getCateList(){
       let result=await uni.$http.get('/api/public/v1/categories')
       if(result.data.meta.status!==200) return uni.$showMsg()
       // 为一级分类列表进行分类
       this.cateList=result.data.message
       // 为二级列表进行分类
       this.cateLevel2=result.data.message[0].children
       console.log(result);
      },
      // 改变激活项 事件委托
      activeChange(e){
        // 指定一级分类的高亮
        this.active=parseInt(e.target.id)
        // 为二级分类重新赋值
        this.cateLevel2=this.cateList[e.target.id].children
        // 为scrollTop赋值
        this.scrollTop= this.scrollTop ==0 ? 1: 0
      },
      // 三级分类的点击事件
      gotoGoodsList(item2){
        // 实现页面的跳转
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item2.cat_id
        })
        console.log(item2);
      }
      // ...
    },
    onLoad(){
      // 获取当前设备信息
      let info = uni.getSystemInfoSync()
      this.wh=info.windowHeight
      // 获取分类列表数据
      this.getCateList()
      // ...
    }
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
  }
  .left-scroll-view-item {
    background-color: #f7f7f7;
    line-height: 60px;
    text-align: center;
    font-size: 12px;
    &.active {
      background-color: #FFFFFF;
      position: relative;
      &::before {
        position: absolute;
        content: " ";
        display: block;
        width: 3px;
        height: 30px;
        background-color: #C00000;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
  }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;
  .cate-lv3-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    margin-bottom: 10px;
    image {
      width: 60px;
      height: 60px;
    }
    text {
        font-size: 12px;
    }
  }
}
</style>
