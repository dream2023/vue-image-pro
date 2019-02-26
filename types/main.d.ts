import Vue, { VNode } from 'vue'

/** ImagePro */
export declare class ImagePro extends Vue {
  /** 图片链接 */
  src?: string

  // 默认图片
  defaultSrc: string

  /**
   * 图片缩放和裁剪模式
   * @default aspectFill
   */
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'heightFix' | 'widthFix'

  /**
   * 用户名
   * @default ''
   */
  username?: string

  /**
   * 图片大小 当 width 和 height 属性存在时会覆盖 size 属性值
   * @default 50
   */
  size?: number

  // 图片宽度
  width?: number

  /** 图片高度 */
  height?: number

  /**
   * 字体颜色
   */
  color?: string

  /**
   * 背景色
   */
  backgroundColor?: string

  /**
   * 圆角
   */
  radius?: number

  /**
   * 自定义样式
   * @default {}
   */
  customStyle?: object

  /**
   * 图片加载失败时触发
   */
  $emit(eventName: 'error'): this
}

export default ImagePro
