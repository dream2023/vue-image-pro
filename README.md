# vue-image-pro

组件的灵感来源于[小程序的 image 组件](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)和[vue-avatar](https://github.com/eliep/vue-avatar) 组件, 相当于同时拥有两者的特性, 实现了包括图片自适应、响应式、当无图片时显示文字等。

具体例子和文档信息请点击[这里]()

## Installation 安装

```
npm install vue-image-pro
```

### Usage 用法

```
import ImagePro from 'vue-image-pro'

export default {
  ...
  components: {
    ImagePro
  },
  ...
}
```

## Props

| 属性名          | 是否必填 |     默认值 | 类型   | 说明                                                         |
| --------------- | :------: | ---------: | ------ | ------------------------------------------------------------ |
| username        |    N     |   (空字符) | String | 当 src 为空时,显示计算后用户名                               |
| src             |    N     |          - | String | 图片链接                                                     |
| mode            |    N     | aspectFill | String | 图片展示模式(下有详细介绍)                                   |
| size            |    N     |         50 | Number | 宽=高=size 值, 如设置 width 和 height 属性, 会覆盖 size 属性 |
| width           |    N     |          - | Number | 图片宽度                                                     |
| height          |    N     |          - | Number | 图片高度                                                     |
| color           |    N     |    #ffffff | String | 字体颜色                                                     |
| backgroundColor |    N     |          - | String | 背景颜色                                                     |
| radius          |    N     |          0 | Number | 图片圆角                                                     |
| customStyle     |    N     |         {} | Object | 自定义样式                                                   |

### mode 值

| 值          | 说明                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| aspectFill  | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取 |
| scaleToFill | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素                                                              |
| aspectFit   | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来                                       |
| widthFix    | 宽度不变，高度自动变化，保持原图宽高比不变                                                                               |
| heightFix   | 高度不变，宽度自动变化，保持原图宽高比不变                                                                               |
| responsive  | 响应式, 高度自动调节, 宽度最大 100%                                                                                      |
