import Vue from 'vue'
import toast from './Toast.vue'

const Toast = Vue.extend(toast)
let instance

export default {
    init(iconType, text) {
		let timer = null
        if (!instance) {
            instance = new Toast({
                el: document.createElement('div')
            })
        }
		if (instance.visible) return

		document.body.style.overflow = 'hidden'
		document.body.appendChild(instance.$el)

		instance.iconType = iconType
		instance.text = text

		timer = setTimeout(() => {
			this.close()
			clearInterval(timer)
		}, 2000)
    },
    success(text) {
        this.init('success', text)
    },
    warning(text) {
        this.init('warning', text)
    },
    close() {
        if (instance) {
			instance.$el.remove()
			document.body.style.overflow = 'initial'
        }
    }
}
