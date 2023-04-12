import Vue from 'vue'
import App from './App'
// 导入网络请求的包
import { $http } from "@escook/request-miniprogram"
// 将网络请求的对象挂载到顶级对象uni身上
uni.$http=$http
// 设置请求的根路径
$http.baseUrl='https://www.uinav.com'
// 配置请求拦截器
$http.beforeRequest=function(options){
  // 开启loading
  uni.showLoading({
    title:"数据加载中...",
  })
}
// 配置响应拦截器
$http.afterRequest=function(){
  // 关闭loading
  uni.hideLoading()
}
// 封装展示消息提示的方法
uni.$showMsg=function(title="数据加载失败!",duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
// 导入store
import store from './store/store.js'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
  store
})
app.$mount()
