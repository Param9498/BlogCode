<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <md-viewer src="Test.md"></md-viewer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MdViewer from '@/components/MdViewer.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    MdViewer
  }
}
</script>
