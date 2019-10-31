<template>
    <div class="record-list" :style="isLast && 'margin-bottom: 0'">
		<div class="list-header">
			<div class="header-name">{{ record.goodsName }}</div>
			<div class="header-integral">-{{ record.payPoint }}积分</div>
		</div>
		<div class="record-date">{{ record.payTime }}</div>
		<div class="record-content ui-border-t">
			<div class="content-info" :class="textHidden && 'textHidden'" :ref="`content-info-${record.id}`" v-html="record.goodsUserRule"></div>
			<div class="content-handler" v-if="showHanddler" @click="clickHandler">
				<div class="sp">{{ toggledTxt }}</div>
				<div class="pick-up" :class="toggled && 'toggled'"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IRecord } from '../ExchangeRecord.vue'

@Component({
    name: 'ContentHandler'
})
export default class ContentHandler extends Vue {
	@Prop({}) private isLast!: boolean
	@Prop({}) private record!: IRecord

    private height: number = 24 // .content-info一行的高度
    private textHidden: boolean = false
    private showHanddler: boolean = false
    private toggledTxt: string = '展开'
	private toggled: boolean = false

    private clickHandler() {
		this.toggled = !this.toggled
        this.textHidden = !this.textHidden
        this.toggledTxt = this.toggled ? '展开' : '收起'
	}

	private mounted() {
		const $contentInfo = this.$refs[`content-info-${this.record.id}`] as HTMLElement
		this.$nextTick(() => {
			const overTripleHeight = $contentInfo.offsetHeight >= this.height * 3
			if (overTripleHeight) {
				this.toggled = !this.toggled
        		this.textHidden = !this.textHidden
			}
			this.showHanddler = overTripleHeight
		})
	}
}
</script>

<style scoped lang="less">
	@import "./record-list.less";
</style>
