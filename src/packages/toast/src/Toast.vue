<template>
    <div class="ui-toast-wrapper">
		<div class="wrapper">
			<img class='ui-toast' v-if="iconType === 'success'" :src="success" />
			<img class='ui-toast' v-if="iconType === 'warning'" :src="warning" />
			<div class="ui-text">{{ text }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Toast',
		data() {
			return {
				iconType: '', // success warning
				text: '',
				success: require('./toast_icon_right.svg'),
				warning: require('./toast_icon_warning.svg')
			}
		}
	}
</script>

<style lang="less" scoped>
.ui-toast-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 99999;

	.wrapper {
		display: flex;
		height: 50px;
		// line-height: 50px;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 14px;
		color: rgba(204, 204, 204, 1);
		box-sizing: border-box;
		padding: 13px 0;

		.ui-toast {
			width: 24px;
			height: 24px;
			margin: 0 10px 0 16px;
			display: block;
		}
		.ui-text {
			padding-right: 10px;
			display: flex;
    		align-items: center;
		}
	}
}
</style>
