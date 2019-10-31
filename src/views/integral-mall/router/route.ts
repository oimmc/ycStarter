import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~home' */ '../views/home/Home.vue')
const Details: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~details' */ '../views/details/Details.vue')
const ExchangeRecord: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~exchangeRecord' */ '../views/exchangeRecord/ExchangeRecord.vue')
const LotteryRule: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~lotteryRule' */ '../views/lottery/rule/Rule.vue')
const LotteryWinningRecord: AsyncComponent = (): any => import(/* webpackChunkName: 'integral-mall~lotteryWinningRecord' */ '../views/lottery/winningRecord/WinningRecord.vue')

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
}, {
	path: '/details',
	name: 'details',
	meta: {
		title: 'details',
		requiresAuth: false
	},
	component: Details
}, {
	path: '/exchangeRecord',
	name: 'exchangeRecord',
	meta: {
		title: 'exchangeRecord',
		requiresAuth: false
	},
	component: ExchangeRecord
}, {
	path: '/lotteryRule',
	name: 'lotteryRule',
	meta: {
		title: 'lotteryRule',
		requiresAuth: false
	},
	component: LotteryRule
}, {
	path: '/lotteryWinningRecord',
	name: 'lotteryWinningRecord',
	meta: {
		title: 'lotteryWinningRecord',
		requiresAuth: false
	},
	component: LotteryWinningRecord
}]

export default routes
