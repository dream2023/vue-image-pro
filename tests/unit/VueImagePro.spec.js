import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueImagePro from '../../src/VueImagePro.vue'
import AvatarMode from '../../src/AvatarMode.vue'
import ImageMode from '../../src/ImageMode.vue'
import plugin from '../../src/index.js'

describe('VueImagePro.vue', function () {
  it('当无src时, 加载AvatarMode', function () {
    const wrapper = shallowMount(VueImagePro)
    expect(wrapper.contains(AvatarMode)).toBe(true)
  })
  it('当有src时, 加载ImageMode', function () {
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        src: 'https://dwz.cn/r5An7zg3'
      }
    })
    expect(wrapper.contains(ImageMode)).toBe(true)
  })

  it('当有src时, 加载成功或者失败的事件触发', function () {
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        src: 'https://dwz.cn/r5An7zg3'
      }
    })
    const image = wrapper.find(ImageMode)
    image.vm.$emit('success')
    expect(wrapper.emitted().success).toBeTruthy()

    image.vm.$emit('error')
    expect(wrapper.emitted().error).toBeTruthy()
  })

  it('imageSrc: 配置全局默认 src', function () {
    const globalSrc = 'https://global.png'
    const localVue = createLocalVue()
    localVue.use(plugin, {
      src: globalSrc
    })
    const wrapper = shallowMount(VueImagePro, {
      localVue
    })
    expect(wrapper.vm.imageSrc).toBe(globalSrc)
  })

  it('imageSrc: 配置defaultSrc, 覆盖全局默认src', function () {
    const globalSrc = 'https://global.png'
    const defaultSrc = 'http://default.png'
    const localVue = createLocalVue()
    localVue.use(plugin, {
      src: globalSrc
    })
    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        defaultSrc: defaultSrc
      }
    })
    expect(wrapper.vm.imageSrc).toBe(defaultSrc)
  })

  it('imageSrc: 配置 src 覆盖 defaultSrc 和 全局默认的src', function () {
    const globalSrc = 'https://global.png'
    const defaultSrc = 'http://default.png'
    const customSrc = 'http://src.png'
    const localVue = createLocalVue()
    localVue.use(plugin, {
      src: globalSrc
    })
    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        defaultSrc: defaultSrc,
        src: customSrc
      }
    })
    expect(wrapper.vm.imageSrc).toBe(customSrc)
  })

  it('computedSize: 默认为50', function () {
    const wrapper = shallowMount(VueImagePro)
    expect(wrapper.vm.computedSize).toBe(50)
  })

  it('computedSize: 配置全局默认值 size', function () {
    const globalSize = 80
    const localVue = createLocalVue()
    localVue.use(plugin, {
      size: globalSize
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue
    })
    expect(wrapper.vm.computedSize).toBe(globalSize)
  })

  it('computedSize: 配置 src 覆盖全局默认值 size', function () {
    const globalSize = 80
    const customSize = 90
    const localVue = createLocalVue()
    localVue.use(plugin, {
      size: globalSize
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        size: customSize
      }
    })
    expect(wrapper.vm.computedSize).toBe(customSize)
  })

  it('imageWidth: 默认值 为 size 值', function () {
    const size = 90
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        size: size
      }
    })
    expect(wrapper.vm.imageWidth).toBe(size)
  })

  it('imageHeight: 默认值 为 size 值', function () {
    const size = 90
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        size: size
      }
    })
    expect(wrapper.vm.imageHeight).toBe(size)
  })

  it('imageWidth: 设置全局width值, 覆盖size值', function () {
    const globalWidth = 100
    const customSize = 99
    const localVue = createLocalVue()
    localVue.use(plugin, {
      width: globalWidth
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        size: customSize
      }
    })
    expect(wrapper.vm.imageWidth).toBe(globalWidth)
  })

  it('imageWidth: 设置width值, 覆盖全局默认width值', function () {
    const globalWidth = 100
    const customWidth = 99
    const localVue = createLocalVue()
    localVue.use(plugin, {
      width: globalWidth
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        width: customWidth
      }
    })
    expect(wrapper.vm.imageWidth).toBe(customWidth)
  })

  it('imageHeight: 设置全局height值, 覆盖size值', function () {
    const globalHeight = 100
    const customSize = 99
    const localVue = createLocalVue()
    localVue.use(plugin, {
      height: globalHeight
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        size: customSize
      }
    })
    expect(wrapper.vm.imageHeight).toBe(globalHeight)
  })

  it('imageHeight: 设置height值, 覆盖全局默认height值', function () {
    const globalHeight = 100
    const customHeight = 99
    const localVue = createLocalVue()
    localVue.use(plugin, {
      height: globalHeight
    })

    const wrapper = shallowMount(VueImagePro, {
      localVue,
      propsData: {
        height: customHeight
      }
    })
    expect(wrapper.vm.imageHeight).toBe(customHeight)
  })

  it('VueImagePro 设置width, height, 同步到AvatarMode', function () {
    const width = 20
    const height = 40
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        width: width,
        height: height
      }
    })
    const avatar = wrapper.find(AvatarMode)
    expect(wrapper.vm.imageWidth).toBe(avatar.vm.width)
    expect(wrapper.vm.imageHeight).toBe(avatar.vm.height)
  })

  it('VueImagePro 设置src, width, height, 同步到ImageMode', function () {
    const width = 20
    const height = 40
    const wrapper = shallowMount(VueImagePro, {
      propsData: {
        src: 'https://dwz.cn/r5An7zg3',
        width: width,
        height: height
      }
    })
    const image = wrapper.find(ImageMode)
    expect(wrapper.vm.imageWidth).toBe(image.vm.width)
    expect(wrapper.vm.imageHeight).toBe(image.vm.height)
    expect(wrapper.vm.imageSrc).toBe(image.vm.src)
  })
})
