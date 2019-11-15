<template>
  <div>
    <!-- <vue-markdown :source="mdText"></vue-markdown>
    <prism language="python" style="width:500px;margin:auto">
      {{ code }}
    </prism> -->
    <span v-for="value in mdText" :key="value.value" @change="code_view_handler">
      <vue-markdown v-if="value.type === 'text'" :source="value.value"></vue-markdown>
      <prism v-else-if="value.type === 'code'" language="python" style="height:800px;width:800px;margin:auto">
        {{ value.value }}
      </prism>
      <img v-else-if="value.type === 'image'" :src="value.url" :alt="value.value" :width="value.width" :height="value.height"/>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'
import Prism from 'vue-prism-component'
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace')

export default {
  name: 'md-viewer',
  props: ['src'],
  components: {
    VueMarkdown,
    Prism
  },
  data: function () {
    return { mdText: [] }
  },
  methods: {
    code_view_handler () {

      // var codes = document.getElementsByTagName('pre')
      // for (let i = 0; i < codes.length; i++) {
      //   console.log(codes[i])
      //   codes[i].innerHTML = codes[i].innerHTML.trim()
      // }
    }
  },
  created () {
    var nw = new Normalizer()
    axios.get(this.src).then(response => {
      console.log(response.data)
      var lines = response.data.match(/^.*([\n\r]+|$)/gm)
      var codeStart = false

      var code = ''

      for (let i = 0; i < lines.length; i++) {
        var line = lines[i]
        var imgRegex = /!\[(.*?)\]\((.*?), (.*?), (.*?)\)/
        if (line.startsWith('```')) {
          codeStart = !codeStart
          while (true) {
            i++
            if (lines[i].startsWith('```')) { break }
            code = code + lines[i]
          }
          code = nw.normalize(code, {
            // Extra settings
            indent: 0,
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true,
            'remove-initial-line-feed': true
          })
          var obj1 = {}
          obj1['type'] = 'code'
          obj1['value'] = code
          obj1['url'] = null
          this.mdText.push(obj1)
          codeStart = !codeStart
        } else if (codeStart === false && imgRegex.test(line)) {
          var imgURL = line.match(imgRegex)[2]
          var imgDescription = line.match(imgRegex)[1]
          var width = line.match(imgRegex)[3]
          var height = line.match(imgRegex)[4]
          var obj2 = {}
          obj2['type'] = 'image'
          obj2['value'] = imgDescription
          obj2['url'] = imgURL
          obj2['height'] = height
          obj2['width'] = width
          this.mdText.push(obj2)
        } else {
          var obj3 = {}
          obj3['type'] = 'text'
          obj3['value'] = line
          obj3['url'] = null
          this.mdText.push(obj3)
        }
      }
    })
  },
  mounted () {
    window.setTimeout(() => {
      var codes = document.getElementsByTagName('code')
      for (let i = 0; i < codes.length; i++) {
        codes[i].innerHTML = codes[i].innerHTML.trim()
      }
    }, 3000)
  }
}
</script>

<style lang="scss">
</style>
