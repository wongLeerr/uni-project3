import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车模块
import cartModule from './cart.js'
// 导入用户相关的模块
import userModule from './user.js'
// 使用插件
Vue.use(Vuex)

// 创建store实例

export default new Vuex.Store({
  modules:{
    'm_cart':cartModule,
    'm_user':userModule
  }
})