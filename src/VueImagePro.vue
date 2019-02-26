<template>
  <div
    :style="imageStyle"
    class="image"
    v-if="imageSrc"
  ></div>
  <avatar
    :backgroundColor="backgroundColor"
    :color="color"
    :customStyle="customStyle"
    :height="imageHeight"
    :radius="radius"
    :username="username"
    :width="imageWidth"
    v-else
  />
</template>

<script>
import Avatar from './Avatar'
const modeArr = ['scaleToFill', 'aspectFit', 'aspectFill', 'heightFix', 'widthFix']

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
      type: String,
      validator (value) {
        return modeArr.includes(value)
      }
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
    Avatar
  },
  computed: {
    // 图片模式
    imageMode () {
      return this.mode || (this.$IMAGE_PRO || {}).mode || 'aspectFill'
    },

    // 图片src
    imageSrc () {
      return this.src || this.defaultSrc || (this.$IMAGE_PRO || {}).src
    },
    // 图片size
    computedSize () {
      return this.size || (this.$IMAGE_PRO || {}).size || 50
    },
    // 图片宽度
    imageWidth () {
      return this.width || (this.$IMAGE_PRO || {}).width || this.computedSize
    },
    // 图片高度
    imageHeight () {
      return this.height || (this.$IMAGE_PRO || {}).height || this.computedSize
    },
    // 图片圆角
    imageRadius () {
      return this.radius || (this.$IMAGE_PRO || {}).radius || 0
    },

    // mode = aspectFill 时 background-size
    aspectFillBackgroundSize () {
      let backgroundSize = ''
      if (this.imageSize.width && this.imageSize.height) {
        let imageWidthPercent = 100
        let imageHeightPercent = 100
        // 图片宽高比
        if (this.imageSize.width < this.imageSize.height) {
          imageHeightPercent = this.imageSize.height / this.imageSize.width * 100
        } else {
          imageWidthPercent = this.imageSize.width / this.imageSize.height * 100
        }

        // 盒子宽高比
        if (this.imageHeight > this.imageWidth) {
          imageWidthPercent *= (this.imageHeight / this.imageWidth)
        } else {
          imageHeightPercent *= (this.imageWidth / this.imageHeight)
        }

        // 获取以 100% 为基础的宽高比
        if (imageWidthPercent < imageHeightPercent) {
          imageHeightPercent *= 100 / imageWidthPercent
          imageWidthPercent = 100
        } else {
          imageWidthPercent *= 100 / imageHeightPercent
          imageHeightPercent = 100
        }
        backgroundSize = `${imageWidthPercent}% ${imageHeightPercent}%`
      } else {
        backgroundSize = null
      }

      return backgroundSize
    },

    // 图片大小
    backgroundSize () {
      let backgroundSize = ''
      switch (this.imageMode) {
        // 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
        case 'aspectFit':
          backgroundSize = 'contain'
          break
        // 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
        case 'aspectFill':
          backgroundSize = this.aspectFillBackgroundSize
          break
        case 'heightFix':
          backgroundSize = 'auto 100%'
          break
        case 'widthFix':
          backgroundSize = '100% auto'
          break
        default:
          // 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
          backgroundSize = `${this.imageWidth}px ${this.imageHeight}px`
      }

      return backgroundSize
    },

    // 图片的样式
    imageStyle () {
      const style = {
        width: `${this.imageWidth}px`,
        height: `${this.imageHeight}px`,
        borderRadius: `${this.imageRadius}%`,
        backgroundSize: this.backgroundSize,
        backgroundImage: `url(${this.imageSrc})`
      }
      return Object.assign({}, style, this.customStyle)
    }
  },
  data () {
    return {
      imageSize: {}
    }
  },
  methods: {
    getImageSize () {
      if (this.imageSrc) {
        const img = new Image()
        img.src = this.imageSrc

        img.onerror = () => {
          this.$emit('error')
        }

        img.onload = () => {
          this.imageSize = {
            width: img.width,
            height: img.height
          }
          img.onload = null // 避免重复加载
        }
      }
    }
  },
  mounted () {
    this.getImageSize()
  }
}
</script>

<style scoped>
.image {
  font-weight: bold;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
