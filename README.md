# vue-image-pro

[![Build Status](https://www.travis-ci.org/dream2023/vue-image-pro.svg?branch=master)](https://www.travis-ci.org/dream2023/vue-image-pro)
[![license](https://img.shields.io/npm/l/vue-image-pro.svg)](https://dream2023.github.io/vue-image-pro/)
[![npm](https://img.shields.io/npm/v/vue-image-pro.svg)](https://www.npmjs.com/package/vue-image-pro)
[![size](https://img.shields.io/bundlephobia/minzip/vue-image-pro.svg)](https://www.npmjs.com/package/vue-image-pro)
[![download](https://img.shields.io/npm/dw/vue-image-pro.svg)](https://npmcharts.com/compare/vue-image-pro?minimal=true)
[![codecov](https://codecov.io/gh/dream2023/vue-image-pro/branch/master/graph/badge.svg)](https://codecov.io/gh/dream2023/vue-image-pro)

## 中文文档

[中文文档](./README.zh-CH.md)

## Description

An image enhancement component for Vue.js.

This component is highly inspired from [vue-avatar](https://github.com/eliep/vue-avatar) and [miniprogram image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html).

This component display an image and if none is provided fallback to the username initials.

## Improvement relative to vue-avatar

- Friendly to Chinese
- When the width and height of the image are inconsistent, it can still be displayed perfectly and will not be deformed.

## Documentation and Examples

[documentation](https://dream2023.github.io/vue-image-pro/)
<br />
[examples](https://jsfiddle.net/zhangchaojie/qtax1kdr/)

## Installation

```bash
npm install vue-image-pro  --save
```

### Usage

```js
// Global installation (Recommend)
import ImagePro from 'vue-image-pro'

// Setting default values
Vue.use(ImagePro, {
  src: '',
  color: '',
  username: '',
  backgroundColor: '',
  size: '',
  width: '',
  height: '',
  radius: '',
  mode: ''
})
```

```js
// Local installation
import { ImagePro } from 'vue-image-pro'

export default {
  ...
  components: {
    ImagePro
  },
  ...
}
```

```html
<image-pro :size="100" username="vue-image-pro" background-color="#123456" />
```

## Props

| Name            | Required | Default                                                                                                  | Type   | Description                                                                                                   |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| username        | N        | (empty)                                                                                                  | String | When the src attribute is empty,The user name that will be used to compute user initial.                      |
| src             | N        | -                                                                                                        | String | Path to the image to display.                                                                                 |
| defaultSrc      | N        | -                                                                                                        | String | Default Picture Links                                                                                         |
| mode            | N        | aspectFill                                                                                               | String | display mode                                                                                                  |
| size            | N        | 50                                                                                                       | Number | width=height=size, If you set the width and height attributes, the size attribute values will be overwritten. |
| width           | N        | -                                                                                                        | Number | image width                                                                                                   |
| height          | N        | -                                                                                                        | Number | image height                                                                                                  |
| color           | N        | Automatic calculation based on background color                                                          | String | font color                                                                                                    |
| backgroundColor | N        | Based on the number of user initials                                                                     | String | background color                                                                                              |
| isShowBgColor   | N        | Boolean                                                                                                  | false  | Whether to display backgroundColor background color when src exists                                           |
| radius          | N        | 0 or 50, When the src attribute value exists, the default value is 0, otherwise the default value is 50. | Number | image radius                                                                                                  |
| customStyle     | N        | {}                                                                                                       | Object | A custom style object to override the base styles                                                             |

### Mode values

| Value       | Description                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aspectFill  | Scale an image while preserving the aspect ratio, ensuring that only short sides of the image are fully displayed. This means that if an image is only complete when shown horizontally or vertically, part of that image will be cut off. |
| scaleToFill | It does not keep the aspect ratio for image zooming, which causes the width and height of images to stretch to fill the 'image' element                                                                                                    |
| aspectFit   | It keeps the aspect ratio for scaled images, allowing the edges of the image to be fully displayed. This means that a complete image can be displayed.                                                                                     |
| widthFix    | Maintains a constant width, and the height automatically changes, keeping the image's original aspect ratio                                                                                                                                |
| heightFix   | Maintains a constant height, and the width automatically changes, keeping the image's original aspect ratio                                                                                                                                |

### Slot

```html
<!-- example -->
<image-pro>slot</image-pro>
```

### Event

| Name    | Description        |
| ------- | ------------------ |
| success | image load success |
| error   | image load error   |
