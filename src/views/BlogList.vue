<template>
  <div class="bloglist">
      {{blogs}}
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'bloglist',
  data () {
    return {
      blogs: []
    }
  },
  created () {
    var that = this
    firebase.firestore().collection('blogs').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        var obj = {}
        obj['title'] = doc.data()['Title']
        obj['URL'] = doc.data()['URL']
        obj['created_at'] = doc.data()['created_at']
        obj['short_description'] = doc.data()['short_description']
        obj['updated_at'] = doc.data()['updated_at']
        that.blogs.push(obj)
      })
    })
  }
}
</script>
