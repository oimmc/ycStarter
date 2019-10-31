<template>
	<LoadingPage>
		<div class="details">
			<div class="pdb60" v-if="!isSuccess">
				<div class="product-info">
					<div class="info-img" :style="`backgroundImage: url('${productDetail.image || imgPlaceholder}')`" />
					<div class="info-desc">
						<div class="info-name">{{ productDetail.name }}</div>
						<div class="info-integral">
							<span class="integral din">{{ productDetail.point }}</span>
							<span class="txt">积分</span>
						</div>
					</div>
				</div>
				<div class="native-product-tips" v-html="productDetail.description">
					<!-- <p class="tips-title">标题</p>
					<p class="tips-content">内容内容内容</p>
					<p class="tips-title">标题</p>
					<p class="tips-content">内容内容内容</p> -->
				</div>
				<MaskTips v-if="showMaskTips" @click="showMaskTips = false" />
				<Dialog :options="dialogOptions" v-if="dialogOptions.show" />
				<button :class="['exchange', btnExchangeDisabled && 'disabled']" type="primary" v-if="btnExchangeDisabled !== 0" @click="exchangeClick">{{ btnExchangeDisabled ? '已抢光' : '立即兑换' }}</button>
			</div>
			<ExchangeSuccess v-if="isSuccess" :useRule="useRule" />
		</div>
	</LoadingPage>
</template>

<script lang="ts">
import { Route } from 'vue-router'
import { Component, Vue } from 'vue-property-decorator'
import MaskTips from './mask-tips/MaskTips.vue'
import ExchangeSuccess from '../exchangeSuccess/ExchangeSuccess.vue'
import { IDialogOptions } from '../../../../packages/types'
import { apiGetGoodsById, apiPostGoodsOrder } from '../../../../assets/ts/api/integral-mall/api.details'
import Detector, { nativeFunction, callNativeFunction } from '../../../../assets/ts/utils/Detector'
import { catchResponse } from '../../../../assets/ts/http'
import toast from '@packages/toast'
// const toast = require('@packages/toast').default

interface IProduct {
	id: number
	name: string
	point: number
	image: string
	remainingInventoryNumber: number
	description?: string
}

@Component({
	name: 'Details',
	beforeRouteLeave(to: Route, from: Route, next: Function) {
		to.meta.fromExchangeSuccess = (this as any).fromExchangeSuccess
        next()
	},
	components: {
		MaskTips,
		ExchangeSuccess
	}
})
export default class Details extends Vue {
	private loadingPageTimeout: boolean = false
	private loadingPageNetworkError: boolean = false
	private loadingResError: boolean = false
	private loadingResErrorMsg: string = ''

	private imgPlaceholder: any = require('../../../../assets/img/img_placeholder.png')
	private fromExchangeSuccess: boolean = false
	private isExchanging: boolean = false
	private showMaskTips: boolean = false
	private btnExchangeDisabled: boolean | number = 0
	private productDetail: IProduct[] = []
	private dialogOptions: IDialogOptions = {
		show: false,
		content: '确认兑换将直接扣减相应积分',
		cancelText: '取消',
		cancelFun: () => {
			this.dialogOptions.show = false
		},
		okText: '确认兑换',
		okFun: () => {
			this.dialogOptions.show = false
			this.sureExchange()
		}
	}
	private isSuccess: boolean = false
	private useRule: string = ''

	private async created() {
		try {
			new Detector().iOS() && callNativeFunction(nativeFunction.BOUNCE_TOGGLE)(1)
			callNativeFunction(nativeFunction.NAVIGATION_SHADOW_TOGGLE)(1)
		} catch (error) {}

		this.getGoodsById()
	}

	private async getGoodsById() {
		this.$loading.open()
		const res: any = await apiGetGoodsById(+this.$route.query.id)
		this.$loading.close()
		document.title = '商品详情'

		catchResponse.call(this, res, () => {
			this.productDetail = res.data
			this.btnExchangeDisabled = res.data.remainingInventoryNumber === 0
		})
	}
	private exchangeClick() {
		if (this.btnExchangeDisabled) {
			return toast.warning('请选择其他商品')
		}
		if (!this.isExchanging) {
			this.dialogOptions.show = true
		}
	}
	private async sureExchange() {
		this.isExchanging = true

		this.$nextTick(() => this.$loading.open(true))
		const res: any = await apiPostGoodsOrder(+this.$route.query.id)
		this.$nextTick(() => this.$loading.close())

		this.isExchanging = false

		if (res.error) {
			alert(res.error.msg)
		} else if (res.data) {
			this.fromExchangeSuccess = false
			if (res.data.status === 0) { // 兑换成功
				document.title = '兑换成功'
				this.isSuccess = true
				this.fromExchangeSuccess = true
				this.useRule = res.data.useRule
			} else if (res.data.status === 1) { // 商品不存在
				this.dialogOptions = {
					show: true,
					content: '商品已售罄',
					okText: '确定',
					okFun: () => {
						this.dialogOptions.show = false
						this.$router.push('/home')
					}
				}
			} else if (res.data.status === 2) { // 商品库存不足
				this.dialogOptions = {
					show: true,
					content: '商品已售罄',
					okText: '确定',
					okFun: () => {
						this.dialogOptions.show = false
						this.getGoodsById()

					}
				}
			} else if (res.data.status === 3) { // 超过个人购买限制
				toast.warning('超过个人购买限制')
				// this.dialogOptions = {
				// 	show: true,
				// 	content: '超过个人购买限制',
				// 	okText: '确定',
				// 	okFun: () => {
				// 		this.dialogOptions.show = false
				// 	}
				// }
			} else if (res.data.status === 4) { // 没有关注好物
				this.showMaskTips = true
			} else if (res.data.status === 5) { // 积分不足
				toast.warning('您的可用积分不足')
				// this.dialogOptions = {
				// 	show: true,
				// 	content: '您的可用积分不足',
				// 	okText: '确定',
				// 	okFun: () => {
				// 		this.dialogOptions.show = false
				// 	}
				// }
			} else { // 兑换失败，请重试
				toast.warning('兑换失败，请重试')
				// this.dialogOptions = {
				// 	show: true,
				// 	content: '兑换失败，请重试',
				// 	okText: '确定',
				// 	okFun: () => {
				// 		this.dialogOptions.show = false
				// 	}
				// }
			}
		} else { // 网络异常
			alert('网络异常，请重试')
		}
	}
}

</script>

<style scoped lang="less">
	@import "./details.less";
</style>
<style lang="less">
	.native-product-tips {
		margin-top: 10px;
		padding: 0 20px 20px;
		background-color: #fff;

		img {
			width: 100%;
		}

		.tips-title {
			padding: 20px 0 6px;
			font-size: 18px;
			color: #333;
			font-weight: bold;
		}

		.tips-content {
			text-align: justify;
			font-size: 16px;
			color: #666;
			line-height: 24px;
		}
	}
</style>
