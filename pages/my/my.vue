<template>
	<view class="my-container">
    <!-- vuex中无token则展示用户登陆组件 -->
    <my-login v-if="!token" ></my-login>
    <!-- vuex中有token则展示用户信息组件 -->
    <my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    mixins:[badgeMix],
    computed:{
      ...mapState('m_user',['token'])
    }
	}
</script>

<style lang="scss">
page,.my-container {
  height: 100%;
}
</style>
