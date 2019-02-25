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
    initials: {
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
    size: {
      type: Number,
      default: 50
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    radius: {
      type: Number,
      default: 50
    },
    lighten: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      backgroundColors: [
        '#F44336', '#FF4081', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
    }
  },

  mounted () {
    this.$emit('avatar-initials', this.username, this.userInitial)
  },

  computed: {
    background () {
      return this.backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors)
    },

    fontColor () {
      return this.color || this.lightenColor(this.background, this.lighten)
    },

    fontSize () {
      let divisor = 0
      const chinesePattern = new RegExp('[\u4E00-\u9FA5]+')
      this.userInitial.split().forEach((item) => {
        if (chinesePattern.test(item)) {
          divisor += 1.8
        } else {
          divisor += 1.3
        }
      })
      return Math.floor(this.size / divisor)
    },

    avatarWidth () {
      return this.width || this.size
    },

    avatarHeight () {
      return this.height || this.size
    },

    style () {
      const style = {
        display: this.inline ? 'inline-flex' : 'flex',
        width: `${this.avatarWidth}px`,
        height: `${this.avatarHeight}px`,
        borderRadius: this.radius + '%',
        lineHeight: `${(this.size + Math.floor(this.size / 20))}px`,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }
      const initialBackgroundAndFontStyle = {
        backgroundColor: this.background,
        font: `${this.fontSize}px/${this.size}px Helvetica, Arial, sans-serif`,
        color: this.fontColor
      }

      Object.assign(style, initialBackgroundAndFontStyle)

      return style
    },

    userInitial () {
      const initials = this.initials || this.initial(this.username)
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
