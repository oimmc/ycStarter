import Vue from 'vue'
import loading from './Loading.vue'

const Loading = Vue.extend(loading)
let instance

export default {
    open(bgTransparent = false) {
        if (!instance) {
            instance = new Loading({
                el: document.createElement('div')
            })
        }
		if (instance.visible) return

		document.body.style.overflow = 'hidden'
		document.body.appendChild(instance.$el)

        Vue.nextTick(() => {
            // instance.visible = true
            instance.bgTransparent = bgTransparent
        })
    },
    close() {
        if (instance) {
			// instance.visible = false
			// document.body.removeChild(instance.$el)
			instance.$el.remove()
			document.body.style.overflow = 'initial'
        }
    }
}
