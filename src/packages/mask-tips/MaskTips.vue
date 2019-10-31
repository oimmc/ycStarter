<template>
    <div class="mask" v-if="options.show">
        <div class="mask-content">
            <div class="content-title">{{ options.title }}</div>
            <div class="content-inner">
				<slot></slot>
			</div>
            <div class="line ui-border-b"></div>
            <div class="content-btn" @click="handleClick">{{ options.btnTxt }}</div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'MaskTips',
	props: {
		options: {
			type: Object,
			default: () => ({
				show: false,
				title: '',
				content: '',
				btnTxt: ''
			})
		}
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		}
	},
	mounted() {
		this.$nextTick(() => {
			document.body.style.overflow = 'hidden'
		})
	},
	destroyed() {
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
			// text-align: justify;
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
