<template>
  <div class="jumbotron">
    <h1>
      <image-pro
        :radius="50"
        :size="80"
        backgroundColor="#409EFF"
        username="vue-image-pro"
      />&nbsp;vue-image-pro
    </h1>
    <p>An Image Component for Vue.js | 一个vue图片加强组件</p>
  </div>
</template>

<script>
export default {
  name: 'DemoHeader'
}
</script>

<style>
.jumbotron {
  text-align: center;
  padding: 2rem 1rem !important;
}
</style>
