import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'katex/dist/katex.min.css'
// load prism somewhere
import 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
