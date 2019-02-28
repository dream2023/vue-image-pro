<template>
  <div class="container">
    <doc-header/>
    <doc-github/>
    <doc-desc/>
    <doc-prop/>
    <h2>示例</h2>
    <iframe
      allowfullscreen="allowfullscreen"
      frameborder="0"
      height="300"
      src="//jsrun.net/x2XKp/embedded/all/light/"
      width="100%"
    ></iframe>
  </div>
</template>

<script>
import DocHeader from './components/DocHeader'
import DocGithub from './components/DocGithub'
import DocDesc from './components/DocDesc'
import DocProp from './components/DocProp'

export default {
  name: 'App',
  components: {
    DocHeader,
    DocGithub,
    DocDesc,
    DocProp
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
