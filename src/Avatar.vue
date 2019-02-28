<template>
  <div
    :style="[style, customStyle]"
    aria-hidden="true"
    class="vue-avatar--wrapper"
  >{{ userInitial }}</div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    username: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    customStyle: {
      type: Object
    },
    inline: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    radius: {
      type: Number
    },
    lighten: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      backgroundColors: [
        '#409EFF', '#F44336', '#FF4081', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
    }
  },

  mounted () {
    this.$emit('avatar-initials', this.username, this.userInitial)
  },

  computed: {
    avatarRadius () {
      return this.radius || (this.$IMAGE_PRO || {}).radius || 50
    },

    background () {
      return this.backgroundColor || (this.$IMAGE_PRO || {}).backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors)
    },

    fontColor () {
      return this.color || (this.$IMAGE_PRO || {}).color || this.lightenColor(this.background, this.lighten)
    },

    fontSize () {
      let divisor
      const chinesePattern = new RegExp('[\u4E00-\u9FA5]+')
      const isChinese = chinesePattern.test(this.userInitial)
      if (this.userInitial.length <= 1) {
        divisor = 1.8
      } else if (this.userInitial.length === 2) {
        if (isChinese) {
          divisor = 2.8
        } else {
          divisor = 2.4
        }
      } else {
        if (isChinese) {
          divisor = 3.6
        } else {
          divisor = 3.0
        }
      }
      return Math.floor(this.width / divisor)
    },

    avatarWidth () {
      return this.width
    },

    avatarHeight () {
      return this.height
    },

    style () {
      const style = {
        display: 'inline-flex',
        width: `${this.avatarWidth}px`,
        height: `${this.avatarHeight}px`,
        borderRadius: this.avatarRadius + '%',
        lineHeight: `${(this.height + Math.floor(this.height / 20))}px`,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }
      const initialBackgroundAndFontStyle = {
        backgroundColor: this.background,
        font: `${this.fontSize}px/${this.width}px Helvetica, Arial, sans-serif`,
        color: this.fontColor
      }

      Object.assign(style, initialBackgroundAndFontStyle)

      return style
    },

    userInitial () {
      const username = this.username || (this.$IMAGE_PRO || {}).username || ''
      const initials = this.initial(username)
      return initials
    }
  },

  methods: {
    initial (username) {
      let parts = username.split(/[ -]/)
      let initials = ''

      for (var i = 0; i < parts.length; i++) {
        initials += parts[i].charAt(0)
      }

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
      }

      initials = initials.substr(0, 3).toUpperCase()

      return initials
    },

    randomBackgroundColor (seed, colors) {
      return colors[seed % (colors.length)]
    },

    lightenColor (hex, amt) {
      // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
      var usePound = false
      if (hex[0] === '#') {
        hex = hex.slice(1)
        usePound = true
      }
      var num = parseInt(hex, 16)
      var r = (num >> 16) + amt
      if (r > 255) r = 255
      else if (r < 0) r = 0
      var b = ((num >> 8) & 0x00FF) + amt
      if (b > 255) b = 255
      else if (b < 0) b = 0
      var g = (num & 0x0000FF) + amt
      if (g > 255) g = 255
      else if (g < 0) g = 0
      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }
  }
}
</script>
