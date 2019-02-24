<template>
  <img
    :src="src"
    :style="responsiveStyle"
    v-if="mode === 'responsive'"
  >
  <div
    :style="imageStyle"
    class="image"
    v-else
  >
    <template v-if="!src">
      {{filtedUsername}}
      <slot/>
    </template>
  </div>
</template>

<script>
// 图片组件
const modeArr = ['scaleToFill', 'aspectFit', 'aspectFill', 'heightFix', 'widthFix', 'responsive']

export default {
  name: 'ImagePro',
  props: {
    // 图片地址
    src: {
      type: String
    },
    // 图片裁剪、缩放的模式
    mode: {
      type: String,
      default: 'aspectFill',
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
      type: Number,
      default: 50
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
      type: String,
      default: '#FFFFFF'
    },
    // 当图片不存在时的背景色
    backgroundColor: {
      type: String,
      default: ''
    },
    // 圆角
    radius: {
      type: Number,
      default: 0
    },
    // 自定义样式
    customStyle: {
      type: Object
    }
  },
  computed: {
    // 图片宽度
    imageWidth () {
      return this.width || this.size
    },
    // 图片高度
    imageHeight () {
      return this.height || this.size
    },
    // 图片大小
    backgroundSize () {
      let backgroundSize = ''
      switch (this.mode) {
        // 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
        case 'aspectFit':
          backgroundSize = 'contain'
          break
        // 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
        case 'aspectFill':
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
    // 字体大小
    fontSize () {
      if (this.filtedUsername && this.filtedUsername.length >= 2) {
        return Math.floor(this.imageWidth / (this.filtedUsername.length + 0.4)) + 'px'
      } else {
        return Math.floor(this.imageWidth / 2.3) + 'px'
      }
    },
    // 当mode=responsive时的样式
    responsiveStyle () {
      const style = {
        borderRadius: this.radius + '%',
        maxWidth: '100%',
        height: 'auto'
      }
      return Object.assign({}, style, this.customStyle)
    },
    // 图片的样式
    imageStyle () {
      const style = {
        color: this.color,
        width: this.imageWidth + 'px',
        borderRadius: this.radius + '%',
        height: this.imageHeight + 'px',
        lineHeight: Math.floor(this.imageHeight * 0.98) + 'px',
        backgroundSize: this.backgroundSize,
        backgroundColor: this.src ? null : this.backgroundColor,
        fontSize: this.fontSize,
        backgroundImage: this.src ? `url(${this.src})` : null
      }
      return Object.assign({}, style, this.customStyle)
    },
    // 用户名的裁剪
    filtedUsername () {
      let parts = this.username.split(/[ -]/)
      let initials = ''
      for (let i = 0; i < parts.length; i++) {
        initials += parts[i].charAt(0)
      }

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
      }

      initials = initials.substr(0, 3).toUpperCase()
      return initials
    }
  },
  data () {
    return {
      imageSize: {}
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

<style scoped>
.image {
  text-align: center;
  font-weight: bold;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
}

.responsive-img {
  max-width: 100%;
  height: auto;
}
</style>
