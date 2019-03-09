import { shallowMount, createLocalVue } from '@vue/test-utils'
import plugin from '../../src/index.js'
import ImageMode from '../../src/ImageMode.vue'

describe('ImageMode.vue', function () {
  it('imageMode: 默认值为: aspectFill', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: 'http://test.png',
        width: 100,
        height: 100
      }
    })

    expect(wrapper.vm.imageMode).toBe('aspectFill')
  })

  it('imageMode: 全局配置', function () {
    const localVue = createLocalVue()
    const globalMode = 'widthFix'
    localVue.use(plugin, {
      mode: globalMode
    })
    const wrapper = shallowMount(ImageMode, {
      localVue,
      propsData: {
        src: 'http://test.png',
        width: 100,
        height: 100
      }
    })
    expect(wrapper.vm.imageMode).toBe(globalMode)
  })

  it('imageMode: 属性mode', function () {
    const localVue = createLocalVue()
    const globalMode = 'widthFix'
    const customMode = 'heightFix'
    localVue.use(plugin, {
      mode: globalMode
    })
    const wrapper = shallowMount(ImageMode, {
      localVue,
      propsData: {
        mode: customMode,
        src: 'http://test.png',
        width: 100,
        height: 100
      }
    })
    expect(wrapper.vm.imageMode).toBe(customMode)
  })

  it('imageRadius: 默认值 0', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: 'http://image.png',
        width: 100,
        height: 100
      }
    })

    expect(wrapper.vm.imageRadius).toBe(0)
  })

  it('imageRadius: 全局设置radius', function () {
    const localVue = createLocalVue()
    const globalRadius = 40
    localVue.use(plugin, {
      radius: globalRadius
    })
    const wrapper = shallowMount(ImageMode, {
      localVue,
      props: {
        width: 100,
        height: 100,
        src: 'https://test.png'
      }
    })

    expect(wrapper.vm.imageRadius).toBe(globalRadius)
  })

  it('imageRadius: 设置属性radius', function () {
    const localVue = createLocalVue()
    const globalRadius = 40
    const customRadius = 60
    localVue.use(plugin, {
      radius: globalRadius
    })
    const wrapper = shallowMount(ImageMode, {
      localVue,
      propsData: {
        radius: customRadius,
        width: 100,
        height: 100,
        src: 'https://test.png'
      }
    })

    expect(wrapper.vm.imageRadius).toBe(customRadius)
  })

  it('backgroundSize: mode: 不填, width: 50, height: 100', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: 50,
        height: 100
      }
    })

    wrapper.setData({
      imageSize: {
        width: 2560,
        height: 1440
      }
    })

    expect(wrapper.vm.backgroundSize).toBe('355% 100%')
  })

  it('backgroundSize: mode: aspectFill, width: 50, height: 100', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        mode: 'aspectFill',
        width: 50,
        height: 100
      }
    })

    wrapper.setData({
      imageSize: {
        width: 2560,
        height: 1440
      }
    })

    expect(wrapper.vm.backgroundSize).toBe('355% 100%')
  })

  it('backgroundSize: width: 100, height: 50', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: 100,
        height: 50
      }
    })

    wrapper.setData({
      imageSize: {
        width: 2560,
        height: 1440
      }
    })

    expect(wrapper.vm.backgroundSize).toBe('100% 112%')
  })
  it('backgroundSize: width: 100, height: 50', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: 100,
        height: 50
      }
    })

    wrapper.setData({
      imageSize: {
        width: 1440,
        height: 2560
      }
    })

    expect(wrapper.vm.backgroundSize).toBe('100% 355%')
  })

  it('backgroundSize: mode: aspectFit', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        mode: 'aspectFit',
        width: 100,
        height: 50
      }
    })

    expect(wrapper.vm.backgroundSize).toBe('contain')
  })

  it('backgroundSize: mode: scaleToFill, width: 50, height: 100', function () {
    const width = 50
    const height = 100
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: width,
        height: height,
        mode: 'scaleToFill'
      }
    })

    expect(wrapper.vm.backgroundSize).toBe(`${width}px ${height}px`)
  })

  it('backgroundSize: mode: heightFix', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: 50,
        height: 50,
        mode: 'heightFix'
      }
    })
    expect(wrapper.vm.backgroundSize).toBe('auto 100%')
  })

  it('backgroundSize: mode: widthFix', function () {
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: '/',
        width: 50,
        height: 50,
        mode: 'widthFix'
      }
    })
    expect(wrapper.vm.backgroundSize).toBe('100% auto')
  })

  it('ImageMode style', function () {
    const src = 'http://localhost/test.jpeg'
    const wrapper = shallowMount(ImageMode, {
      propsData: {
        src: src,
        width: 100,
        height: 100
      }
    })

    wrapper.setData({
      imageSize: {
        width: 2560,
        height: 1440
      }
    })

    expect(JSON.stringify(wrapper.vm.imageStyle)).toBe(
      JSON.stringify({
        width: `100px`,
        height: `100px`,
        borderRadius: `0%`,
        backgroundSize: '177% 100%',
        backgroundImage: `url(${src})`
      })
    )
  })
})
