import Vue from 'vue'

Vue.filter('numFormat', (value: number) => {
	const reg = /\d{1,3}(?=(\d{3})+$)/g
	return (value + '').replace(reg, '$&,')
})
