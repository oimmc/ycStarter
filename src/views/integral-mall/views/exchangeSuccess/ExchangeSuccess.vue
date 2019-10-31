<template>
	<div class="exchangeSuccess">
		<img class="img_exchange_succeed" src="../../../../assets/img/img_exchange_succeed.png" alt="exchange_succeed.png" />
		<div class="title">兑换成功</div>
		<div class="content">
			<!-- <p>话费将直接充值至您的注册手机号，</p>
			<p>请注意查看</p> -->
			<div v-html="useRule"></div>
		</div>
		<div class="btns">
			<div class="btn" @click="goHome">返回积分商城</div>
			<div class="btn ml10" @click="$router.push('/exchangeRecord')">查看兑换记录</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Detector, { nativeFunction, callNativeFunction } from '../../../../assets/ts/utils/Detector'
import { urlQuery } from '@utils'

@Component({
	name: 'ExchangeSuccess'
})
export default class ExchangeSuccess extends Vue {
	@Prop({
		default: ''
	}) private useRule!: string

	private goHome() {
		if (this.$route.query.from === 'home') {
			window.history.go(-1)
		} else {
			this.$router.replace('/home')
		}
	}
}
</script>

<style scoped lang="less">
	@import url("./exchangeSuccess.less");
</style>
