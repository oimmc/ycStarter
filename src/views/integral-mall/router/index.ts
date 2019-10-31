import Vue from 'vue'
import Router, { Route, RouteRecord } from 'vue-router'
import routes from './route'

Vue.use(Router)

const router: Router = new Router({
	// mode: 'history',
	mode: 'hash',
	base: '/',
	routes
})

router.beforeEach((to: Route, from: Route, next: Function) => {
	next()
})

router.afterEach((route: Route) => {
})

export default router
