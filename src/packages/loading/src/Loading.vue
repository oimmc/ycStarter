<template>
    <div class="ui-loading-wrapper" :style="`backgroundColor: ${bgTransparent ? 'transparent' : '#fff' }`">
		<div class="wrapper">
			<img class='ui-loading' :src="lodingSvg" />
			<div class="ui-text">加载中…</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Loading',
		data() {
			return {
				visible: false,
				bgTransparent: false,
				lodingSvg: require('./svg.svg')
			}
		}
	}
</script>

<style lang="less" scoped>
.ui-loading-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 99999;

	.wrapper {
		width: 122px;
		height: 50px;
		line-height: 50px;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -25px;
		margin-left: -61px;
		font-size: 14px;
		color: rgba(204, 204, 204, 1);

		.ui-loading {
			float: left;
			width: 24px;
			height: 24px;
			margin: 13px 10px 13px 16px;
			display: block;
			animation: loading 1.5s infinite linear;
		}
		.ui-text {
			float: left;
		}
	}

	@keyframes loading {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
