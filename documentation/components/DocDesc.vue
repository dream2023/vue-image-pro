<template>
  <div>
    <div>
      <h2>介绍</h2>
      <p>
        组件的灵感来源于
        <a
          href="https://developers.weixin.qq.com/miniprogram/dev/component/image.html"
        >小程序的image组件</a> 和
        <a href="https://github.com/eliep/vue-avatar">vue-avatar</a> 组件, 相当于同时拥有两者的特性, 实现了包括图片自适应、响应式、当无图片时显示文字等。
      </p>
    </div>
    <div>
      <h2>jsfindle在线示例</h2>
      <a
        href="https://jsfiddle.net/zhangchaojie/hj67nkwv/"
        target="_blank"
      >点我查看</a>
    </div>
    <div>
      <h2>安装</h2>
      <pre><code class="bash">npm install vue-image-pro --save</code></pre>
    </div>
    <div>
      <h2>用法</h2>
      <pre>
        <code class="js">
// 全局 (推荐)
import ImagePro from 'vue-image-pro'

// 可以配置全局默认值
Vue.use(ImagePro, {
  src: '',
  color: '',
  username: '',
  backgroundColor: '',
  size: '',
  width: '',
  height: '',
  radius: '',
  mode: ''
})
        </code>
      </pre>
      <pre><code class="javascript">
// 局部导入
// 这里注意要有 {} 括号
import { ImagePro } from 'vue-image-pro'

export default {
  components: {
    ImagePro
  }
}
</code></pre>
      <p>使用:</p>
      <pre><code class="html">&lt;image-pro :size="100" backgroundColor="#409EFF" username="vue-image-pro"/&gt;</code></pre>
      <p>你将会看到:</p>
      <p>
        <image-pro
          :size="100"
          backgroundColor="#409EFF"
          username="vue-image-pro"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocDesc'
}
</script>

<style scoped>
</style>
