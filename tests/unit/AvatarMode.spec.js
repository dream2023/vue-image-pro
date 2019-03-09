import { shallowMount, createLocalVue } from '@vue/test-utils'
import plugin from '../../src/index.js'
import AvatarMode from '../../src/AvatarMode.vue'

describe('AvatarMode.vue', function () {
  it('avatarRadius: 默认值为50', function () {
    const wrapper = shallowMount(AvatarMode)

    expect(wrapper.vm.avatarRadius).toBe(50)
  })

  it('avatarRadius: 全局设置radius', function () {
    const localVue = createLocalVue()
    const globalRadius = 40
    localVue.use(plugin, {
      radius: globalRadius
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue
    })

    expect(wrapper.vm.avatarRadius).toBe(globalRadius)
  })

  it('avatarRadius: 设置属性radius', function () {
    const localVue = createLocalVue()
    const globalRadius = 40
    const customRadius = 60
    localVue.use(plugin, {
      radius: globalRadius
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue,
      propsData: {
        radius: customRadius
      }
    })

    expect(wrapper.vm.avatarRadius).toBe(customRadius)
  })

  it('background: 默认根据名称长度获取颜色', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: ''
      }
    })

    expect(wrapper.vm.background).toBe('#409EFF')
    wrapper.setProps({
      username: '123'
    })

    expect(wrapper.vm.background).toBe('#9C27B0')
    wrapper.setProps({
      username: Array(20)
        .fill('1')
        .join('')
    })
    expect(wrapper.vm.background).toBe('#409EFF')
  })

  it('background: 默认情况下, 当名称超过背景数据, 从0开始', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: Array(20)
          .fill('1')
          .join('')
      }
    })

    expect(wrapper.vm.background).toBe('#409EFF')
  })

  it('background: 设置全局backgroundColor, 覆盖默认的background', function () {
    const localVue = createLocalVue()
    const globalBackgroundColor = '#123456'
    localVue.use(plugin, {
      backgroundColor: globalBackgroundColor
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue
    })
    expect(wrapper.vm.background).toBe(globalBackgroundColor)
  })

  it('background: 设置backgroundColor, 会覆盖全局的backgroundColor', function () {
    const localVue = createLocalVue()
    const globalBackgroundColor = '#123456'
    const customBackgroundColor = '#123123'
    localVue.use(plugin, {
      backgroundColor: globalBackgroundColor
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue,
      propsData: {
        backgroundColor: customBackgroundColor
      }
    })
    expect(wrapper.vm.background).toBe(customBackgroundColor)
  })

  it('fontColor: 默认为背景色的亮色', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        backgroundColor: '#123456'
      }
    })
    expect(wrapper.vm.fontColor).toBe('#6284a6')
  })

  it('fontColor: 设置全局字体颜色', function () {
    const localVue = createLocalVue()
    const globalColor = '#123456'
    localVue.use(plugin, {
      color: globalColor
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue
    })
    expect(wrapper.vm.fontColor).toBe(globalColor)
  })

  it('fontColor: 设置属性color', function () {
    const localVue = createLocalVue()
    const globalColor = '#123456'
    const customColor = '#123123'
    localVue.use(plugin, {
      color: globalColor
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue,
      propsData: {
        color: customColor
      }
    })
    expect(wrapper.vm.fontColor).toBe(customColor)
  })

  it('fontSize: 中文 1 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: '张',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 1.8))
  })

  it('fontSize: 中文 2 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: '张 超',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 2.8))
  })

  it('fontSize: 中文 3 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: '张 超 杰',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 3.6))
  })

  it('fontSize: 英文 1 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'z',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 1.8))
  })

  it('fontSize: 英文 2 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'z c',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 2.4))
  })

  it('fontSize: 英文 3 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'z c j',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 3.0))
  })

  it('fontSize: 英文 >3 个字时', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'z c j',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 3.0))
  })

  it('fontSize: 中英混合, 按中文', function () {
    const width = 50
    const height = 50
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'z 超 j',
        width,
        height
      }
    })
    expect(wrapper.vm.fontSize).toBe(Math.floor(width / 3.6))
  })

  it('initial: 根据 空格 和 - 分割', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'zhang chao jie'
      }
    })
    expect(wrapper.vm.userInitial).toBe('ZCJ')

    wrapper.setProps({
      username: '张-超-杰'
    })
    expect(wrapper.vm.userInitial).toBe('张超杰')
  })

  it('initial: 最多3个字', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'zhang chao jie a asdf '
      }
    })
    expect(wrapper.vm.userInitial).toBe('ZCJ')

    wrapper.setProps({
      username: '张-超 杰 噢 杰 噢'
    })
    expect(wrapper.vm.userInitial).toBe('张超杰')
  })

  it('initial: 英文字大写', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'zhang chao jie '
      }
    })
    expect(wrapper.vm.userInitial).toBe('ZCJ')

    wrapper.setProps({
      username: '张 c 杰 '
    })
    expect(wrapper.vm.userInitial).toBe('张C杰')
  })

  it('initial: 分割大于3个, 且存在大写, 仅显示大写', function () {
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        username: 'Zhang chao jie Ha'
      }
    })
    expect(wrapper.vm.userInitial).toBe('ZH')
  })

  it('userInitial: 默认为空', function () {
    const wrapper = shallowMount(AvatarMode)
    expect(wrapper.vm.userInitial).toBe('')
  })

  it('userInitial: 设置全局username', function () {
    const localVue = createLocalVue()
    const globalUsername = 'zhang chaojie'
    localVue.use(plugin, {
      username: globalUsername
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue
    })
    expect(wrapper.vm.userInitial).toBe('ZC')
  })

  it('userInitial: 设置属性username', function () {
    const localVue = createLocalVue()
    const globalUsername = 'zhang chaojie'
    const customUsername = '张超杰'
    localVue.use(plugin, {
      username: globalUsername
    })
    const wrapper = shallowMount(AvatarMode, {
      localVue,
      propsData: {
        username: customUsername
      }
    })
    expect(wrapper.vm.userInitial).toBe('张')
  })

  it('style', function () {
    const width = 40
    const height = 40
    const wrapper = shallowMount(AvatarMode, {
      propsData: {
        width,
        height,
        username: 'zhang chao jie',
        backgroundColor: '#eee',
        color: '#efefef'
      }
    })

    expect(JSON.stringify(wrapper.vm.style)).toBe(
      JSON.stringify({
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '50%',
        backgroundColor: '#eee',
        font: `${Math.floor(
          width / 3.0
        )}px/${width}px bold Helvetica, Arial, sans-serif`,
        color: '#efefef',
        lineHeight: `${height + Math.floor(height / 20)}px`
      })
    )
  })
})
