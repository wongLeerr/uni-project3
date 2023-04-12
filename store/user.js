export default {
  namespaced:true,
  state:() => {
    return {
      // JSON.parse(uni.getStorageSync('address'))
      address:JSON.parse(uni.getStorageSync('address') || '{}')
    }
  },
  mutations:{
    // 更新收货地址
    updateAddress(state,address){
      state.address=address
      // 持久化存储
      this.commit("m_user/saveToStorage")
    },
    // 将地址持久化存储至本地
    saveToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
      // uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters:{
    
  }
}