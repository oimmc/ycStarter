<template>
    <div class="loading-page">
        <div v-if="$parent.loadingPageTimeout || $parent.loadingPageNetworkError || $parent.loadingResError" class='loading-network' @click="refresh">
			<div v-if="$parent.loadingPageTimeout || $parent.loadingPageNetworkError || $parent.loadingResError" class='loading-bg icon-service'></div>
			<div v-if="$parent.loadingPageTimeout" class='service-error-text'>请求超时，轻触重新加载</div>
			<div v-if="$parent.loadingPageNetworkError" class='service-error-text'>加载出错，轻触重新加载</div>
			<div v-if="$parent.loadingResError" class='service-error-text'>{{ $parent.loadingResErrorMsg }}</div>
        </div>
		<slot v-if="!$parent.loadingPageTimeout && !$parent.loadingPageNetworkError && !$parent.loadingResError"></slot>
    </div>
</template>

<script>
    export default {
        name: 'LoadingPage',
        props: {
			noData: {
				type: Boolean,
				default: false
			}
		},
        methods: {
            refresh() {
                window.location.reload()
            }
        }
    }
</script>

<style lang="less" scoped>
.loading-page{
	.loading-network {
		text-align: center;
        z-index: 9999;
        position: absolute;
        top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
        .loading-bg {
            width: 160px;
			height: 141px;
			margin: 0 auto;
            background-image: url("./loading-hill.png");
            background-size: cover;
            &.icon-service {
                width: 160px;
                height: 141px;
                background-image: url("./no-service.png");
            }
        }
        .loading-text {
            width: 131px;
            font-size: 14px;
            color: #9b9b9b;
            text-align: center;
        }
        .service-error-text {
            font-size: 16px;
			color: #9b9b9b;
			margin-top: 20px;
        }
    }
}
</style>
