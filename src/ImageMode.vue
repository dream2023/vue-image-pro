<template>
  <div
    :style="imageStyle"
    class="vue-image-pro--wrapper"
  ></div>
</template>

<script>
const modeArr = ['scaleToFill', 'aspectFit', 'aspectFill', 'heightFix', 'widthFix']

export default {
  name: 'ImageMode',
  props: {
    // 图片地址
    src: {
      type: String,
      required: true
    },

    // 图片裁剪、缩放的模式
    mode: {
      type: String,
      validator (value) {
        return modeArr.includes(value)
      }
    },

    // 圆角
    radius: {
      type: Number
    },

    // 宽度
    width: {
      type: Number,
      required: true
    },

    // 高度
    height: {
      type: Number,
      required: true
    },

    // 自定义样式
    customStyle: {
      type: Object
    }
  },
  data () {
    return {
      imageSize: {}
    }
  },
  computed: {
    // 图片模式
    imageMode () {
      return this.mode || (this.$IMAGE_PRO || {}).mode || 'aspectFill'
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
        if (this.height > this.width) {
          imageWidthPercent *= (this.height / this.width)
        } else {
          imageHeightPercent *= (this.width / this.height)
        }

        // 获取以 100% 为基础的宽高比
        if (imageWidthPercent < imageHeightPercent) {
          imageHeightPercent *= 100 / imageWidthPercent
          imageWidthPercent = 100
        } else {
          imageWidthPercent *= 100 / imageHeightPercent
          imageHeightPercent = 100
        }
        backgroundSize = `${Math.floor(imageWidthPercent)}% ${Math.floor(imageHeightPercent)}%`
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
        case 'scaleToFill':
        default:
          // 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
          backgroundSize = `${this.width}px ${this.height}px`
      }

      return backgroundSize
    },

    // 图片的样式
    imageStyle () {
      const style = {
        width: `${this.width}px`,
        height: `${this.height}px`,
        borderRadius: `${this.imageRadius}%`,
        backgroundSize: this.backgroundSize,
        backgroundImage: `url(${this.src})`
      }
      return Object.assign({}, style, this.customStyle)
    }
  },
  methods: {
    getImageSize () {
      if (this.src) {
        const img = new Image()
        img.src = this.src

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

<style>
.vue-image-pro--wrapper {
  font-weight: bold;
  display: inline-block;
  background-repeat: no-repeat;
  vertical-align: middle;
  background-position: center;
}
</style>
