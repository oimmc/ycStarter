<template>
    <div id="app">
        <keep-alive include="Home">
			<router-view />
		</keep-alive>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue'

	export default Vue.extend({
		name: 'App'
	})
</script>

<style>
    @import url("../assets/style/app.less");
</style>
