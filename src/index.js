import VueImagePro from './VueImagePro'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('image-pro', VueImagePro)
}

export default {
  install (Vue, opts = {}) {
    Vue.component('image-pro', VueImagePro)

    Vue.prototype.$IMAGE_PRO = opts
  }
}

export { VueImagePro as ImagePro }
