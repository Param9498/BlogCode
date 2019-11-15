import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'katex/dist/katex.min.css'
// load prism somewhere
import 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'
import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDEGfxllJRyp5kQxLfY4Kw5YgX7EXkNYis',
  authDomain: 'blog-e9289.firebaseapp.com',
  databaseURL: 'https://blog-e9289.firebaseio.com',
  projectId: 'blog-e9289',
  storageBucket: 'blog-e9289.appspot.com',
  messagingSenderId: '1051217383794',
  appId: '1:1051217383794:web:e28d11c74e00f231954deb'
})

Vue.config.productionTip = false
Vue.use(VueFire)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export const db = firebase.firestore()
