<template>
  <div>
    <h2>属性</h2>
    <table class="table">
      <thead>
        <tr>
          <th>属性名</th>
          <th>是否必填</th>
          <th>默认值</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="index"
          v-for="(prop, index) of props"
        >
          <td>{{prop.name}}</td>
          <td>{{prop.required}}</td>
          <td>{{prop.default}}</td>
          <td>{{prop.type}}</td>
          <td>{{prop.desc}}</td>
        </tr>
      </tbody>
    </table>

    <h3>mode值</h3>
    <table class="table">
      <thead>
        <tr>
          <th>值</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="index"
          v-for="(item, index) of mode"
        >
          <td>{{item.value}}</td>
          <td>{{item.desc}}</td>
        </tr>
      </tbody>
    </table>

    <h2>支持插槽</h2>
    <pre>
        <code class="html">&lt;image-pro :size="100"&gt;插槽&lt;/image-pro&gt;</code>
      <image-pro :size="100">
        <span style="font-size:28px">插槽</span>
      </image-pro>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'DocProp',
  data () {
    return {
      props: [
        {
          name: 'username',
          required: 'N',
          default: '(空字符)',
          type: 'String',
          desc: '当 src 为空时,显示计算后用户名'
        },
        {
          name: 'src',
          required: 'N',
          default: '-',
          type: 'String',
          desc: '图片链接'
        },
        {
          name: 'defaultSrc',
          required: 'N',
          default: '-',
          type: 'String',
          desc: '默认图片'
        },
        {
          name: 'mode',
          required: 'N',
          default: 'aspectFill',
          type: 'String',
          desc: '图片展示模式(下有详细介绍)'
        },
        {
          name: 'size',
          required: 'N',
          default: '50',
          type: 'Number',
          desc: '宽=高=size值, 如设置 width 和 height属性, 会覆盖size属性'
        },
        {
          name: 'width',
          required: 'N',
          default: '-',
          type: 'Number',
          desc: '图片宽度'
        },
        {
          name: 'height',
          required: 'N',
          default: '-',
          type: 'Number',
          desc: '图片高度'
        },
        {
          name: 'color',
          required: 'N',
          default: '(根据背景色计算)',
          type: 'String',
          desc: '字体颜色'
        },
        {
          name: 'backgroundColor',
          required: 'N',
          default: '(随机颜色)',
          type: 'String',
          desc: '背景颜色'
        },
        {
          name: 'radius',
          required: 'N',
          default: '有图时默认: 0, 无图时默认: 50',
          type: 'Number',
          desc: '图片圆角'
        },
        {
          name: 'customStyle',
          required: 'N',
          default: '{}',
          type: 'Object',
          desc: '自定义样式'
        }
      ],
      mode: [
        {
          value: 'aspectFill',
          desc: '保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取'
        },
        {
          value: 'scaleToFill',
          desc: '不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素'
        },
        {
          value: 'aspectFit',
          desc: '保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来'
        },
        {
          value: 'widthFix',
          desc: '宽度不变，高度自动变化，保持原图宽高比不变'
        },
        {
          value: 'heightFix',
          desc: '高度不变，宽度自动变化，保持原图宽高比不变'
        }
      ]
    }
  }
}
</script>
