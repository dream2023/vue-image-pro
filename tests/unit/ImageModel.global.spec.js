import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import MyPlugin from '../../src/index.js'

import VueImagePro from '../../src/VueImagePro.vue'
import ImageMode from '../../src/ImageMode.vue'
const globalSrc = 'global'
const globalSize = 100
const globalWidth = 80
const globalHeight = 90
const globalRadius = 20
const globalMode = 'scaleToFill'

const localVue = createLocalVue()
localVue.use(MyPlugin, {
  src: globalSrc,
  size: globalSize,
  width: globalWidth,
  height: globalHeight,
  radius: globalRadius,
  mode: globalMode
})

const wrapper = mount(VueImagePro, {
  localVue
})

describe('设置全局默认值, 判断加载顺序', function () {
  it('imageSrc: this.src || this.defaultSrc || (this.$IMAGE_PRO || {}).src', () => {
    // 加载 ImageMode 而不是 AvatarMode
    expect(wrapper.contains(ImageMode)).to.equal(true)

    const imageMode = wrapper.find(ImageMode)
    expect(imageMode.vm.src).to.equal('global')

    // 设置default src
    wrapper.setProps({ defaultSrc: 'default' })
    expect(imageMode.vm.src).to.equal('default')

    // 设置 src
    wrapper.setProps({ src: 'src' })
    expect(imageMode.vm.src).to.equal('src')
  })

  it('computedSize: this.size || (this.$IMAGE_PRO || {}).size || 50', () => {
    // global size
    expect(wrapper.vm.computedSize).to.equal(globalSize)

    // size
    const customSize = 150
    wrapper.setProps({ size: customSize })
    expect(wrapper.vm.computedSize).to.equal(customSize)
  })

  it('imageWidth: this.width || (this.$IMAGE_PRO || {}).width || this.computedSize', function () {
    expect(wrapper.vm.imageWidth).to.equal(globalWidth)

    const customWidth = 160
    wrapper.setProps({ width: customWidth })
    expect(wrapper.vm.imageWidth).to.equal(customWidth)
  })

  it('imageHeight: this.height || (this.$IMAGE_PRO || {}).height || this.computedSize', function () {
    expect(wrapper.vm.imageHeight).to.equal(globalHeight)

    const customHeight = 160
    wrapper.setProps({ height: customHeight })
    expect(wrapper.vm.imageHeight).to.equal(customHeight)
  })

  it('imageRadius: this.radius || (this.$IMAGE_PRO || {}).radius || 0', function () {
    const imageMode = wrapper.find(ImageMode)
    expect(imageMode.vm.imageRadius).to.equal(globalRadius)

    const customRadius = 50
    wrapper.setProps({ radius: customRadius })
    expect(imageMode.vm.imageRadius).to.equal(customRadius)
  })

  it("imageMode: this.mode || (this.$IMAGE_PRO || {}).mode || 'aspectFill'", function () {
    const imageMode = wrapper.find(ImageMode)
    expect(imageMode.vm.imageMode).to.equal(globalMode)

    const customMode = 'heightFix'
    wrapper.setProps({ mode: customMode })
    expect(imageMode.vm.imageMode).to.equal(customMode)
  })
})
