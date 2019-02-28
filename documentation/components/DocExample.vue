<template>
  <div>
    <h2>示例</h2>
    <table class="table">
      <thead>
        <tr>
          <th>效果</th>
          <th>代码</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="index"
          v-for="(item, index) of examples"
        >
          <td>
            <image-pro v-bind="item.props">
              <template v-if="item.slot">{{item.slot}}</template>
            </image-pro>
          </td>
          <td>
            <pre v-if="item.slot"><code class="html">&lt;!-- {{item.desc}} --&gt;

&lt;image-pro
<div
  :key="key"
  v-for="(value, key) of item.props"
>&nbsp;&nbsp;{{typeof value === 'string' ? '' : ':'}}{{key}}="{{value}}"&gt;</div>  {{item.slot}}
&lt;/image-pro&gt;
</code></pre>

            <pre v-else><code class="html">&lt;!-- {{item.desc}} --&gt;

&lt;image-pro
<div
  :key="key"
  v-for="(value, key) of item.props"
>&nbsp;&nbsp;{{typeof value === 'string' ? '' : ':'}}{{key}}="{{value}}"</div>/&gt;</code></pre>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DocExample',
  data () {
    return {
      examples: [
        {
          props: {
            size: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '保持了纵横比, 短边能完全显示出来, 另一个方向将会发生截取'
        },
        {
          props: {
            width: 50,
            height: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '可以设置宽高, 依然保持宽高, 完美显示 '
        },
        {
          props: {
            mode: 'scaleToFill',
            size: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '不保持纵横比缩放图片, 拉伸至填满 image 元素 '
        },
        {
          props: {
            mode: 'aspectFit',
            size: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '保持纵横比缩放图片, 长边能完全显示出来, 可以完整地将图片显示出'
        },
        {
          props: {
            mode: 'widthFix',
            size: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '宽度不变，高度自动变化，保持原图宽高比不变'
        },
        {
          props: {
            mode: 'heightFix',
            size: 100,
            src: 'https://dwz.cn/r5An7zg3'
          },
          desc: '高度不变，宽度自动变化，保持原图宽高比不变'
        },
        {
          props: {
            size: 100,
            defaultSrc: 'https://dwz.cn/q4z3fZF1'
          },
          desc: '可以设置默认显示图片'
        },
        {
          props: {
            size: 100,
            username: 'zhangchaojie'
          },
          desc: '默认情况, background随机, color根据背景计算'
        },
        {
          props: {
            size: 100,
            radius: 50,
            color: '#fff',
            backgroundColor: '#000',
            username: '张-超'
          },
          desc: '可以设置背景和字体颜色'
        },
        {
          props: {
            size: 100,
            backgroundColor: '#409EFF',
            username: 'zhang chaojie'
          },
          desc: '当无图片是, 显示username'
        },
        {
          props: {
            size: 100,
            backgroundColor: '#409EFF',
            username: 'zhang chao jie'
          },
          desc: 'username 可以根据空格进行拆分'
        },
        {
          props: {
            size: 100,
            radius: 50,
            backgroundColor: '#409EFF',
            username: '张'
          },
          desc: 'username 可以根据 - 进行拆分, 可以设置 radius'
        },
        {
          props: {
            size: 100,
            customStyle: { opacity: 0.4 },
            radius: 50,
            color: '#67C23A',
            backgroundColor: '#000',
            username: '张-超-杰'
          },
          desc: '可以自定义样式 '
        },
        {
          props: {
            size: 100,
            username: '张-超-杰'
          },
          slot: '插槽',
          desc: '支持插槽'
        }
      ]
    }
  }
}
</script>
