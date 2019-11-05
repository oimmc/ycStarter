import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~home' */ '../views/Home.vue')

Vue.use(Router)

const routes: RouteConfig[] = [{
	path: '/',
	redirect: '/home'
}, {
	path: '/home',
	name: 'home',
	meta: {
		title: 'Home',
		requiresAuth: false
	},
	component: Home
}]

export default routes
