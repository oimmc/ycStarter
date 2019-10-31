<template>
	<LoadingPage>
		<div class="exchangeRecord">
			<div ref="mescroll" class="mescroll">
				<div class="mescroll-content" style="padding: 20px 20px 0;">
					<RecordList :record="item" :isLast="index === records.length - 1" v-for="(item, index) in records" :key="item.id" />
					<div id="native-no-data"></div>
				</div>
			</div>
		</div>
	</LoadingPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RecordList from './record-list/RecordList.vue'
import { apiGetGoodsOrder } from '../../../../assets/ts/api/integral-mall/api.exchangeRecord'
import Detector, { nativeFunction, callNativeFunction } from '../../../../assets/ts/utils/Detector'
import { catchResponse } from '../../../../assets/ts/http'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

export interface IRecord {
	id: number
	goodsName: string
	goodsUserRule: string
	payPoint: number
	orderNo: string
	payTime: string
	userId: string
}

@Component({
	name: 'ExchangeRecord',
	components: {
		RecordList
	}
})
export default class ExchangeRecord extends Vue {
	private loadingPageTimeout: boolean = false
	private loadingPageNetworkError: boolean = false
	private loadingResError: boolean = false
	private loadingResErrorMsg: string = ''

	private mescroll: any

	private records: IRecord[] = []

	private created() {
		try {
			new Detector().iOS() && callNativeFunction(nativeFunction.BOUNCE_TOGGLE)(0)
			callNativeFunction(nativeFunction.NAVIGATION_SHADOW_TOGGLE)(1)
		} catch (error) {}
	}

	private mounted() {
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
					num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 10 // 每页数据条数,默认10
				},
				htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">正在加载...</p>',
				htmlNodata: '<div class="page-footer-box"><div class="page-footer">美好生活 云成相伴</div></div>',
				noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据; 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
				empty: {
					// 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
					warpId: 'native-no-data', // 父布局的id (1.3.5版本支持传入dom元素)
					icon: require('../../../../assets/img/no_data.png'), // 图标,默认null,支持网络图
					tip: '暂无记录' // 提示
				}
			}
		})
	}
	private async upCallback(page: any) {
		this.$loading.open(true)
		const res: any = await apiGetGoodsOrder(page.num, page.size)
		this.$loading.close()

		if (page.num === 1) {
			document.title = '兑换记录'
			this.records = []
		}

		catchResponse.call(this, res, () => {
			this.$nextTick(() => {
				this.mescroll.endSuccess(res.data.length)
				this.records = this.records.concat(res.data)
			})
		}, true)
	}
}

</script>

<style scoped lang="less">
	@import "./exchangeRecord.less";
</style>
<style lang="less">
	@import url("../../../../assets/style/app-mescroll.less");
</style>
