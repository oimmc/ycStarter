import Vue from 'vue'

declare module 'vue/types/vue' {
  	interface Vue {
		// ui
		$toast: any
		$loading: any
		// utils
		urlQuery: any
  	}
}
