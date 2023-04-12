// 显示购物车徽标的抽离代码
import {mapGetters} from 'vuex'
export default {
  methods:{
    // 展示tabBar栏中购物车这一项的徽标
    setBadge(){
      // 调用uni.setBarBadge方法可以为某项 tabBar 项设置徽标
      uni.setTabBarBadge({
        // tabBar项的索引
        index:2,
        // 徽标的内容（必须为字符串）
        text:this.total+""
      })
    }
  },
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onLoad(){
    this.setBadge()
  },
  watch:{
    // 在total发生变化时立即更改徽标
    total(){
      this.setBadge()
    }
  }
}