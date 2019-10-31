import LoadingPage from './loading-page'
import Dialog from './dialog'
import Loading from './loading'
// import Toast from './toast'

const components = [
	LoadingPage,
	Dialog
]

const install = function (Vue) {
	if (install.installed) return
	components.map((component) => Vue.component(component.name, component))
	Vue.prototype.$loading = Loading
	// Vue.prototype.$toast = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install,
	LoadingPage,
	Dialog
}
