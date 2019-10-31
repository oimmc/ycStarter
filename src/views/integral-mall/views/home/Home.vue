<template>
	<LoadingPage>
		<div class="home">
			<div class="integral-bar">
				<div class="integral">
					<span class="num din">{{ points | numFormat }}</span>
					<span class="sp">积分</span>
				</div>
				<div class="integral-nav">
					<router-link class="item" tag="div" to="/exchangeRecord">
						<div class="icon first"></div>
						<div class="txt">兑换记录</div>
					</router-link>
					<div class="border ui-border-l"></div>
					<div class="item" @click="goToMyPoints()">
						<div class="icon second"></div>
						<div class="txt">赚积分</div>
					</div>
				</div>
			</div>

			<div ref="mescroll" class="mescroll" style="position: fixed;top: 132px;bottom: 0;height: auto;">
				<!-- 可嵌套内容 -->
				<!-- <div>可嵌套内容可嵌套内容</div> -->
				<div class="mescroll-content">
					<div class="products">
						<!-- <router-link class="product-viewer" tag="div" :to="`/details?id=${item.id}&from=home`" :class="cls(index)" v-for="(item, index) in products" :key="item.id"> -->
						<router-link class="product-viewer" tag="div" :to="`/details?id=${item.id}&from=home`" v-for="(item, index) in products" :key="item.id">
							<div class="img-wrap">
								<div class="product-img" :style="`backgroundImage: url('${item.image || imgPlaceholder}')`" />
								<div class="sold-out" v-if="item.remainingInventoryNumber === 0"></div>
							</div>
							<div class="product-name">{{ item.name }}</div>
							<div class="product-integral">
								<span class="integral">{{ item.point }}</span>
								<span class="txt">积分</span>
							</div>
							<div class="bordert" :class="cls(index)"></div>
						</router-link>
					</div>
					<div id="native-no-data"></div>
				</div>
			</div>
		</div>
	</LoadingPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { apiGetAccountsPoints, apiGetGoods } from '../../../../assets/ts/api/integral-mall/api.home'
import Detector, { nativeFunction, callNativeFunction } from '../../../../assets/ts/utils/Detector'
import { catchResponse } from '../../../../assets/ts/http'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { Route } from 'vue-router'

interface IProduct {
	id: number
	name: string
	point: number
	image: string
	remainingInventoryNumber: number
}

@Component({
	name: 'Home',
	beforeRouteEnter(to: Route, from: Route, next: Function) {
        next((vm: any) => {
			document.title = '积分商城'

			try {
				new Detector().iOS() && callNativeFunction(nativeFunction.BOUNCE_TOGGLE)(0)
				callNativeFunction(nativeFunction.NAVIGATION_SHADOW_TOGGLE)(1)
			} catch (error) {}

			(vm as any).$refs.mescroll.scrollTop = from.meta.scrollTop

			if (to.meta.fromExchangeSuccess) {
				(vm as any).getAccountsPoints(true);
			}
		})
    },
	beforeRouteLeave(to: Route, from: Route, next: Function) {
		to.meta.scrollTop = (this as any).$refs.mescroll.scrollTop
        next()
	}
})
export default class Home extends Vue {
	private loadingPageTimeout: boolean = false
	private loadingPageNetworkError: boolean = false
	private loadingResError: boolean = false
	private loadingResErrorMsg: string = ''

	private mescroll: any

	private imgPlaceholder: any = require('../../../../assets/img/img_placeholder.png')
	private points: string | number = '获取中'
	private products: IProduct[] = []

	private created() {
		this.getAccountsPoints()
	}
	private mounted() {
		this.$nextTick(() => {
			this.mescroll = new MeScroll(this.$refs.mescroll, { // 在mounted初始化mescroll,确保此处配置的ref有值
				down: {
					use: true,
					auto: false,
					minAngle: 45,
					// textLoading: '正在加载...',
					htmlContent: '<div class="mescrollSpinner"><div class="bounce bounce1"></div><div class="bounce bounce2"></div><div class="bounce"></div></div>'
				},
				up: {
					auto: true,
					callback: this.upCallback,
					page: {
						num: 0,
						size: 10
					},
					// htmlLoading: '',
					htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">正在加载...</p>',
					htmlNodata: '<div class="page-footer-box"><div class="page-footer">美好生活 云成相伴</div></div>',
					noMoreSize: 6,
					empty: {
						warpId: 'native-no-data',
						icon: require('../../../../assets/img/no_data.png'),
						tip: '暂无记录'
					}
				}
			})
		})
	}

	private async upCallback(page: any) {
		if (page.num !== 1) {
			this.$loading.open(true)
		}
		const res: any = await apiGetGoods(page.num, page.size)
		if (page.num !== 1) {
			this.$loading.close()
		}

		if (page.num === 1) {
			this.products = []
		}

		catchResponse.call(this, res, () => {
			this.$nextTick(() => {
				this.mescroll.endSuccess(res.data.content.length)
				this.products = this.products.concat(res.data.content)
			})
		}, true)
	}

	private async getAccountsPoints(bgTransparent?: boolean | undefined) {
		this.$loading.open(bgTransparent);
		const res: any = await apiGetAccountsPoints()
		this.$loading.close();

		document.title = '积分商城'

		catchResponse.call(this, res, () => {
			this.points = res.data.points
		})
	}
	private goToMyPoints() {
		window.history.go(-1) // window.location.replace('/static/app-webview/dist/page/integration/integration.html')
	}
	private cls(index: number) {
		const len = this.products.length
		if (len % 2 === 1 && index === len - 1) {
			return ''
		}
		if (len % 2 === 0 && (index === len - 1 || index === len - 2)) {
			return ''
		}
		return 'ui-border-tt'
	}
}
</script>

<style scoped lang="less">
	@import "../../../../assets/style/border.less";
	@import "./home.less";
</style>
<style lang="less">
	@import url("../../../../assets/style/app-mescroll.less");
	.home .mescroll-downwarp {
		background-color: #fff;
	}
</style>
