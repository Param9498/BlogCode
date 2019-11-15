<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <md-viewer v-if="src != ''" :src="src"></md-viewer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MdViewer from '@/components/MdViewer.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'home',
  components: {
    HelloWorld,
    MdViewer
  },
  data () {
    return {
      src: ''
    }
  },
  created () {
    var that = this
    firebase.firestore().collection('blogs').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        that.src = doc.data().URL
        console.log(that.src)
      })
    })
  }
}
</script>
