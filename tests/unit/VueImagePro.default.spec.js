import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import VueImagePro from '../../src/VueImagePro.vue'
import ImageMode from '../../src/ImageMode.vue'
import AvatarMode from '../../src/AvatarMode.vue'

const defaultSize = 50

describe('设置全局默认值, 判断加载顺序', function () {
  it('computedSize 默认值 50', function () {
    let wrapper = mount(VueImagePro)

    expect(wrapper.vm.computedSize).to.equal(defaultSize)
  })

  it('imageWidth  默认值 computedSize', function () {
    let wrapper = mount(VueImagePro)

    expect(wrapper.vm.imageWidth).to.equal(defaultSize)
  })

  it('imageHeight 默认值 computedSize', function () {
    let wrapper = mount(VueImagePro)

    expect(wrapper.vm.imageHeight).to.equal(defaultSize)
  })

  it('当设置了 width 时, 覆盖 size 设置值', function () {
    const width = 80
    let wrapper = mount(VueImagePro, {
      propsData: {
        width: width
      }
    })

    expect(wrapper.vm.imageWidth).to.equal(width)
  })

  it('当设置了 height 时, 覆盖 size 设置值', function () {
    const height = 90
    let wrapper = mount(VueImagePro, {
      propsData: {
        height: height
      }
    })

    expect(wrapper.vm.imageHeight).to.equal(height)
  })

  it('imageMode: 默认值 aspectFill', function () {
    const wrapper = mount(VueImagePro, {
      propsData: {
        src: 'http://image.png'
      }
    })

    const imageMode = wrapper.find(ImageMode)
    expect(imageMode.vm.imageMode).to.equal('aspectFill')
  })

  it('imageRadius: 默认值 0', function () {
    const wrapper = mount(VueImagePro, {
      propsData: {
        src: 'http://image.png'
      }
    })

    const imageMode = wrapper.find(ImageMode)
    expect(imageMode.vm.imageRadius).to.equal(0)
  })

  it('avatarRadius: 默认值 50', function () {
    const wrapper = mount(VueImagePro)
    const avatarMode = wrapper.find(AvatarMode)
    expect(avatarMode.vm.avatarRadius).to.equal(50)
  })

  it('background: 默认值 #409EFF', function () {
    const wrapper = mount(VueImagePro)
    const avatarMode = wrapper.find(AvatarMode)
    expect(avatarMode.vm.background).to.equal('#409EFF')
  })

  it('fontColor: 默认值 #90eeff', function () {
    const wrapper = mount(VueImagePro)
    const avatarMode = wrapper.find(AvatarMode)
    expect(avatarMode.vm.fontColor).to.equal('#90eeff')
  })
})
