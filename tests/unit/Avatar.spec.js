import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import AvatarMode from '../../src/AvatarMode.vue'

describe('AvatarMode.vue', function () {
  const width = 100
  const height = 100
  const wrapper = mount(AvatarMode, {
    propsData: {
      width: width,
      height: height
    }
  })
  it('username 根据 空格 和 - 分割', function () {
    wrapper.setProps({
      username: 'zhang chao jie'
    })
    expect(wrapper.vm.userInitial).to.equal('ZCJ')

    wrapper.setProps({
      username: '张-超-杰'
    })
    expect(wrapper.vm.userInitial).to.equal('张超杰')
  })

  it('userInitial 最多3个字', function () {
    wrapper.setProps({
      username: 'zhang-chao jie ha ha'
    })
    expect(wrapper.vm.userInitial).to.equal('ZCJ')

    wrapper.setProps({
      username: '张-超 杰 噢'
    })
    expect(wrapper.vm.userInitial).to.equal('张超杰')
  })

  it('userInitial 英文字大写', function () {
    wrapper.setProps({
      username: 'zhang-Chao J'
    })
    expect(wrapper.vm.userInitial).to.equal('ZCJ')

    wrapper.setProps({
      username: '张 c 杰 '
    })
    expect(wrapper.vm.userInitial).to.equal('张C杰')
  })

  it('fontSize 中文 1 个字时', function () {
    wrapper.setProps({
      username: '张'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 1.8))
  })

  it('fontSize 中文 2 个字时', function () {
    wrapper.setProps({
      username: '张 超'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 2.8))
  })

  it('fontSize 中文 3 个字时', function () {
    wrapper.setProps({
      username: '张 超 杰'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 3.6))
  })

  it('fontSize 英文 1 个字时', function () {
    wrapper.setProps({
      username: 'zhangchaojie'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 1.8))
  })

  it('fontSize 英文 2 个字时', function () {
    wrapper.setProps({
      username: 'zhang chaojie'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 2.4))
  })

  it('fontSize 英文 3 个字时', function () {
    wrapper.setProps({
      username: 'zhang chao jie'
    })
    expect(wrapper.vm.fontSize).to.equal(Math.floor(width / 3.0))
  })

  it('AvatarMode style', function () {
    wrapper.setProps({
      username: 'zhang chao jie',
      backgroundColor: '#eee',
      color: '#efefef'
    })

    expect(JSON.stringify(wrapper.vm.style)).to.equal(
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
