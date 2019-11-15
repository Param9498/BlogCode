<template>
  <div>
    <vue-markdown :source="mdText"></vue-markdown>
    <prism language="python" style="width:500px;margin:auto">
      {{ code }}
    </prism>
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
    return { mdText: [], code: '' }
  },
  mounted () {
    var nw = new Normalizer({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true
    })
    axios.get(this.src).then(response => {
      console.log(this.mdText)
      var lines = response.data.match(/^.*([\n\r]+|$)/gm)
      var textStart = false
      var codeStart = false
      var imgStart = false

      var code = ''
      var text = ''
      var img = ''

      for (var i = 0; i < lines.length; i++) {
        console.log(lines[i])
        if (codeStart === false && !lines[i].startsWith('```')) {
          console.log(lines[i])
          text = text + lines[i]
        }
        if (lines[i].startsWith('```')) {
          codeStart = !codeStart
          continue
        }
        if (codeStart) {
          code = code + lines[i]
        }
      }
      code = nw.normalize(code, {
        // Extra settings
        indent: 1
      })
      console.log(code)
      this.mdText = text
      this.code = code
    })
  }
}
</script>

<style lang="scss"></style>
