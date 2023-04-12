export default {
  // 开启命名空间
  namespaced:true,
  
  // 数据
  state:() => {
    return {
      // 购物车数据
      cart:JSON.parse(uni.getStorageSync('cart') || '[]')
    }
  },
  
  // 修改数据的方法
  mutations:{
    // 添加数据到购物车
    addToCart(state,goods){
      console.log("goods:",goods);
      // 首先判断购物车中是否有这个商品呢
     let findResult = state.cart.find((item) => {
        return item.goods_id==goods.goods_id
      })
      if(findResult){
        console.log("findResult:",findResult);
        findResult.goods_count++;
      }else {
        console.log("goods::",goods);
        state.cart.push(goods);
      }
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
      
      console.log(state.cart);
      
    },
    // 将数据持久化存储
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 修改商品的选中状态
    updateGoodsState(state,goodss){
      // 首先找出此商品
      const findResult = state.cart.find((goods) => {
        return goods.goods_id==goodss.goods_id
      })
      // 修改该商品的选中状态
      if(findResult){
        findResult.goods_state = goodss.goods_state
      }
      // 持久化存储
      this.commit("m_cart/saveToStorage")
    },
    // 修改vuex中的数据，并进行持久化存储
    updateGoodsNum(state,{goods_id,goods_count}){
      // 首先找出此商品
      let findResult =   state.cart.find((goods) => {
        return goods.goods_id==goods_id
      })
      // 修改该商品的数量
      if(findResult){
        findResult.goods_count = goods_count
      }
      // 持久化存储
      this.commit("m_cart/saveToStorage")
    },
    // 清空某一个item项
    deleteItem(state,goods_id){
      // 首先找出此商品 (可以使用过滤器)
    state.cart = state.cart.filter((goods) => {
        return goods.goods_id!==goods_id
      })
      console.log(state.cart);
      // 持久化存储
      this.commit("m_cart/saveToStorage")
      
    },
    // 更新所有商品为选中或者不选中状态
    updateAllGoodsState(state,newState){
      state.cart.forEach((goods) => {
        goods.goods_state=newState
      })
      // 进行持久化存储
      this.commit("m_cart/saveToStorage")
    }
    // ...
    
  },
  
  // 计算属性
  getters:{
    // 求出购物车中商品总数量
    total(state){
      let sum=0;
      state.cart.forEach((goods) => {
        sum+=goods.goods_count;
      });
      return sum;
    },
    checkedCount(state){
      // 首先过滤
     let sum= state.cart.filter((goods) => {
        return goods.goods_state==true
      }).reduce((sum,item) => {
        return sum+item.goods_count
      },0)
      return sum;
    },
    // 计算已勾选商品的总价格
    checkedGoodsAmount(state){
      // 首先过滤掉没有勾选的商品
     return state.cart.filter((goods) => {
        return goods.goods_state==true;
      }).reduce((pre,goods) => {
        return pre+goods.goods_count*goods.goods_price
      },0).toFixed(2)
    }
  
  }
}