<template>
    <div class="dialog">
        <div class="dialog-content">
            <div class="content-title" v-if="options.title">{{ options.title }}</div>
            <div class="content-inner">{{ options.content }}</div>
            <div class="line"></div>
            <div class="content-btns">
                <div class="cancelBtn" v-if="options.cancelText" @click="options.cancelFun">{{ options.cancelText }}</div>
				<div class="lineVer" v-if="options.cancelText && 'ui-border-l'"></div>
                <div class="okBtn" v-if="options.okText" @click="options.okFun">{{ options.okText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Dialog',
	props: {
		options: {
			type: Object,
			default: () => ({
				title: '',
				content: '',
				cancelText: '',
				cancelFun: undefined,
				okText: '',
				okFun: undefined
			})
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

<style lang="less" scoped>
.dialog {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99998;
    .dialog-content {
        width: 267px;
		padding: 0 16px;
		border-radius: 2px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        .content-title {
			padding-top: 20px;
            font-size: 18px;
            color: #333;
            font-weight: 500;
            text-align: center;
        }
        .content-inner {
            padding: 20px 0px;
            font-size: 16px;
            color: #666;
            line-height: 24px;
            text-align: center;
        }
        .line {
			margin: 0 -16px;
			height: 1px;
			background: rgba(0, 0, 0, 0.08);
			transform: scaleY(.5);
        }
        .content-btns {
            display: flex;
            height: 50px;
            line-height: 50px;
            margin: 0 -16px;
            font-size: 16px;
            color: #999;
            text-align: center;
            .cancelBtn {
                flex: 1;
                cursor: pointer;
                -webkit-appearance: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

                &:focus {
                    outline: none;
                }
			}
			.lineVer {
				height: 50px;
				width: 1px;
				background: rgba(0, 0, 0, 0.08);
				transform: scaleX(.5);
			}
            .okBtn {
                flex: 1;
                color: #166ce9;
                cursor: pointer;
                -webkit-appearance: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

                &:focus {
                    outline: none;
                }
            }
        }
    }
}
</style>
