import Vue from 'vue'
import App from './App.vue'

import ImagePro from '../src/index'

// Vue.component(ImagePro.name, ImagePro)
Vue.use(ImagePro)

new Vue({
  render: h => h(App)
}).$mount('#app')
