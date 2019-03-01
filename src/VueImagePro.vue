<template>
  <image-mode
    :customStyle="customStyle"
    :height="imageHeight"
    :mode="mode"
    :radius="radius"
    :src="imageSrc"
    :width="imageWidth"
    v-if="imageSrc"
  />
  <avatar-mode
    :backgroundColor="backgroundColor"
    :color="color"
    :customStyle="customStyle"
    :height="imageHeight"
    :radius="radius"
    :username="username"
    :width="imageWidth"
    v-else
  >
    <slot></slot>
  </avatar-mode>
</template>

<script>
import AvatarMode from './AvatarMode'
import ImageMode from './ImageMode'

export default {
  name: 'ImagePro',
  props: {
    // 图片地址
    src: {
      type: String
    },
    // 默认图片地址
    defaultSrc: {
      type: String
    },
    // 图片裁剪、缩放的模式
    mode: {
      type: String
    },
    // src不存在时显示用户名
    username: {
      type: String,
      default: ''
    },
    // 当宽高相等时
    size: {
      type: Number
    },
    // 宽度
    width: {
      type: Number
    },
    // 高度
    height: {
      type: Number
    },
    // 字体颜色
    color: {
      type: String
    },
    // 当图片不存在时的背景色
    backgroundColor: {
      type: String
    },
    // 圆角
    radius: {
      type: Number
    },
    // 自定义样式
    customStyle: {
      type: Object
    }
  },
  components: {
    AvatarMode,
    ImageMode
  },
  computed: {
    // 图片size
    computedSize () {
      return this.size || (this.$IMAGE_PRO || {}).size || 50
    },

    // 图片src
    imageSrc () {
      return this.src || this.defaultSrc || (this.$IMAGE_PRO || {}).src
    },

    // 图片宽度
    imageWidth () {
      return this.width || (this.$IMAGE_PRO || {}).width || this.computedSize
    },

    // 图片高度
    imageHeight () {
      return this.height || (this.$IMAGE_PRO || {}).height || this.computedSize
    }
  }
}
</script>
