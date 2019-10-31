<template>
    <div class="record-list" :style="isLast && 'margin-bottom: 0'">
        <div class="header">
            <div class="title">
                <div class="name">{{ record.name }}</div>
                <div class="tip" :style="record.status === 2 && {color: '#999'}">{{tipsText[record.status]}}</div>
            </div>
            <div class="date">{{ record.bingoDate }}</div>
            <div class="border1 line"></div>
        </div>
        <div class="content">
            <p>有效期至：{{ record.validDate }}</p>
            <p>使用说明：您可在华能成长宝APP“好物”栏目，购买商品时使用。</p>
        </div>
        <div class="btn" v-if="record.status === 1 || record.status === 3" @click="getGoods">领取</div>
        <MaskTips :options="maskTipsOptions" @click="maskTipsOptions.show = false">
            <div v-html="maskTipsOptions.content"></div>
        </MaskTips>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { apiPostBingo } from '../../../../../../assets/ts/api/integral-mall/api.sign'
import { IRecord } from '../WinningRecord.vue'
import MaskTips from '@packages/mask-tips/MaskTips.vue'
import { IMaskTipsOptions } from '../../../../../../packages/types'
import toast from '@packages/toast'
@Component({
    name: 'RecordList',
    components: {
        MaskTips
    }
})
export default class RecordList extends Vue {
    @Prop({}) private isLast!: boolean
    @Prop({}) private record!: IRecord
    @Prop({}) private fun!: any

    private maskTipsOptions: IMaskTipsOptions = {}
	private tipsText: object = {
			0: '',
			1: '待领取',
			2: '已领取',
			3: '待领取',
		}
	private async postBingo(id: number) {
		this.$nextTick(() => this.$loading.open(true))
		const res: any = await apiPostBingo(id)
		this.$nextTick(() => this.$loading.close())
		if (res.error) {
			alert(res.error.msg)
		} else {
			if (!res.data) {
				this.maskTipsOptions = {
					show: true,
					title: this.record.type === 3 ? '代金券领取说明' : '话费领取说明',
					content: this.record.type === 3
								? '<p>1、请在微信中搜索并关注“华能成长宝”公众号。</p><p>2、请在公众号中依次点击“我的”—“绑定账号”，完成账号绑定后才能领取该代金券。</p>'
								: '请电话咨询客服人员为您重新发放话费券，联系电话<span style="color: #166CE9">400-666-8201</span>',
					btnTxt: '我知道了'
				}
			} else {
				toast.success('领取成功')
				window.location.reload()
			}
		}
	}

    private getGoods() {
		if ((this.record.status === 1 || this.record.status === 3) && this.record.type === 3) {
			this.postBingo(this.record.id)
		} else {
			this.maskTipsOptions = {
				show: true,
				title: this.record.type === 3 ? '代金券领取说明' : '话费领取说明',
				content: this.record.type === 3
							? '<p>1、请在微信中搜索并关注“华能成长宝”公众号。</p><p>2、请在公众号中依次点击“我的”—“绑定账号”，完成账号绑定后才能领取该代金券。</p>'
							: '请电话咨询客服人员为您重新发放话费券，联系电话<span style="color: #166CE9">400-666-8201</span>',
				btnTxt: '我知道了'
			}
		}
    }
}
</script>

<style scoped lang="less">
@import "./record-list.less";
</style>
