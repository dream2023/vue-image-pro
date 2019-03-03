import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import VueImagePro from '../../src/VueImagePro.vue'
import AvatarMode from '../../src/AvatarMode.vue'
import MyPlugin from '../../src/index.js'

const globalRadius = 20
const globalColor = '#fefefe'
const globalUsername = 'z c j'
const globalBackgroundColor = '#eeeeee'

const localVue = createLocalVue()
localVue.use(MyPlugin, {
  radius: globalRadius,
  color: globalColor,
  username: globalUsername,
  backgroundColor: globalBackgroundColor
})

const wrapper = mount(VueImagePro, {
  localVue
})

describe('设置全局默认值, 判断加载顺序', function () {
  it('background: this.backgroundColor || (this.$IMAGE_PRO || {}).backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors)', function () {
    expect(wrapper.contains(AvatarMode)).to.equal(true)
    const avatar = wrapper.find(AvatarMode)
    // 全局背景色
    expect(avatar.vm.background).to.equal(globalBackgroundColor)

    // 自定义 backgroundColor
    const customBackground = '#123456'
    wrapper.setProps({ backgroundColor: customBackground })
    expect(avatar.vm.background).to.equal(customBackground)
  })

  it('fontColor: this.color || (this.$IMAGE_PRO || {}).color || this.lightenColor(this.background, this.lighten)', function () {
    // 全局颜色
    const avatar = wrapper.find(AvatarMode)
    expect(avatar.vm.fontColor).to.equal(globalColor)

    // 设置自定义颜色
    const customColor = '#456123'
    wrapper.setProps({
      color: customColor
    })
    expect(avatar.vm.fontColor).to.equal(customColor)
  })

  it("userInitial: username = this.username || (this.$IMAGE_PRO || {}).username || ''", function () {
    // 全局颜色
    const avatar = wrapper.find(AvatarMode)
    expect(avatar.vm.userInitial).to.equal('ZCJ')

    // 设置用户名
    const customUsername = '张超杰'
    wrapper.setProps({
      username: customUsername
    })
    expect(avatar.vm.userInitial).to.equal('张')
  })
})
