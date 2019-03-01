<template>
  <div class="container">
    <doc-header/>
    <doc-github/>
    <doc-desc/>
    <doc-prop/>
    <doc-example v-if="isDev"/>
    <div v-else>
      <h2>示例</h2>
      <iframe
        allowfullscreen="allowfullscreen"
        frameborder="0"
        height="2000"
        src="//jsrun.net/x2XKp/embedded/all/light/"
        width="100%"
      ></iframe>
    </div>
  </div>
</template>

<script>
import DocHeader from './components/DocHeader'
import DocGithub from './components/DocGithub'
import DocDesc from './components/DocDesc'
import DocProp from './components/DocProp'
import DocExample from './components/DocExample'

export default {
  name: 'App',
  components: {
    DocHeader,
    DocGithub,
    DocDesc,
    DocProp,
    DocExample
  },
  data () {
    return {
      isDev: process.env.NODE_ENV === 'development'
    }
  }
}
</script>

<style>
body {
  padding: 15px;
  line-height: 1.8;
  color: #303133;
}
h2 {
  margin-top: 35px;
}
.container {
  max-width: 760px;
  margin: 0 auto;
}
table tr:nth-child(2n) {
  background-color: #f1f1f1;
}
table th {
  border-top: 1px solid #ebeef5;
}
table td,
table th {
  padding: 8px 8px;
  border-bottom: 1px solid #ebeef5;
}
</style>
