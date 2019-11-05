import Vue, { CreateElement } from 'vue'
import router from './router'
import App from './views/App.vue'
import { getCookie } from '@utils'
import '@directives/focus'
import '@filters'

const VueAnalytics = require('vue-analytics').default

Vue.use(VueAnalytics, {
	id: 'UA-45403210-1',
	router,
	autoTracking: {
		pageviewOnLoad: false
	},
	set: [{
		user_id: getCookie('gaOpenId')
	}]
})

/* eslint-disable-next-line no-new */
const main: Vue = new Vue({
	el: '#app',
	router,
	render: (h: CreateElement) => h(App)
})

export default main
