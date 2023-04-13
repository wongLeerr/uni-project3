export default {
  namespaced:true,
  state:() => {
    return {
      // JSON.parse(uni.getStorageSync('address'))
      address:JSON.parse(uni.getStorageSync('address') || '{}'),
      // 用户token
      token:uni.getStorageSync('token') || '',
      // 用户信息
      userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
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
    },
    // 更新用户的信息
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo;
      // 持久化存储userInfo
      this.commit('m_user/setUserInfoToStorage')
    },
    // 持久化存储userInfo
    setUserInfoToStorage(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    // 存储token
    updateToken(state,token){
      state.token=token
      this.commit('m_user/setTokenToStorage')
    },
    // 持久化存储token
    setTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    }
    
  },
  getters:{
    
  }
}