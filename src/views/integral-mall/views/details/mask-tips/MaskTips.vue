<template>
    <div class="mask">
        <div class="mask-content">
            <div class="content-title">温馨提示</div>
            <div class="content-inner">
                <p>1、请在微信中搜索并关注“华能成长宝”公众号；</p>
                <p>2、请在公众号中依次点击“我的”—“绑定账号”，完成账号绑定后才能兑换该商品。</p>
            </div>
            <div class="line ui-border-b"></div>
            <div class="content-btn" @click="handleClick">确定</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
    name: 'MaskTips'
})
export default class MaskTips extends Vue {
    @Emit()
    private handleClick(evt: any) {
        this.$emit('click', evt)
	}
	private mounted() {
		this.$nextTick(() => {
			document.body.style.overflow = 'hidden'
		})
	}
	private destroyed() {
		document.body.style.overflow = 'initial'
	}
}
</script>

<style scoped lang="less">
.mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99998;
    .mask-content {
        width: 280px;
		padding: 20px 24px;
		box-sizing: border-box;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        .content-title {
            font-size: 20px;
            color: #333;
            font-weight: bold;
            padding-bottom: 10px;
        }
        .content-inner {
            font-size: 16px;
            color: #666;
			line-height: 24px;
			text-align: justify;
        }
        .line {
            height: 1px;
            margin: 20px 0;
        }
        .content-btn {
            width: 190px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            background: #166ce9;
            border-radius: 22px;
            color: #fff;
            text-align: center;
        }
    }
}
</style>
