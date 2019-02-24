import VueImagePro from './VueImagePro'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('image-pro', VueImagePro)
}

export default VueImagePro
