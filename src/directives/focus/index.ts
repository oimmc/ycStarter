import Vue from 'vue'

Vue.directive('focus', {
	inserted(el: HTMLElement) {
		el.focus()
	}
})
