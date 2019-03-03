import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ImageMode from '../../src/ImageMode.vue'

describe('ImageMode.vue', function () {
  const src = 'http://localhost/test.jpeg'
  const wrapper = mount(ImageMode, {
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

  it('ImageMode style', function () {
    expect(JSON.stringify(wrapper.vm.imageStyle)).to.equal(
      JSON.stringify({
        width: `100px`,
        height: `100px`,
        borderRadius: `0%`,
        backgroundSize: '177% 100%',
        backgroundImage: `url(${src})`
      })
    )
  })

  it('mode: null, width: 50, height: 100 => backgroundSize: 355% 100%', function () {
    wrapper.setProps({
      width: 50,
      height: 100
    })
    expect(wrapper.vm.backgroundSize).to.equal('355% 100%')
  })

  it('mode: aspectFill, width: 50, height: 100 => backgroundSize: 355% 100%', function () {
    wrapper.setProps({
      width: 50,
      height: 100,
      mode: 'aspectFill'
    })
    expect(wrapper.vm.backgroundSize).to.equal('355% 100%')
  })

  it('width: 100, height: 50 => backgroundSize: 100% 112%', function () {
    wrapper.setProps({
      width: 100,
      height: 50
    })

    expect(wrapper.vm.backgroundSize).to.equal('100% 112%')
  })

  it('mode: aspectFit => backgroundSize: contain', function () {
    wrapper.setProps({
      mode: 'aspectFit'
    })

    expect(wrapper.vm.backgroundSize).to.equal('contain')
  })

  it('mode: scaleToFill, width: 50, height: 100 => backgroundSize: width, height', function () {
    const width = 50
    const height = 100
    wrapper.setProps({
      width: width,
      height: height,
      mode: 'scaleToFill'
    })

    expect(wrapper.vm.backgroundSize).to.equal(`${width}px ${height}px`)
  })

  it('mode: heightFix => backgroundSize: auto 100%', function () {
    wrapper.setProps({
      mode: 'heightFix'
    })

    expect(wrapper.vm.backgroundSize).to.equal('auto 100%')
  })

  it('mode: widthFix => backgroundSize: 100% auto', function () {
    wrapper.setProps({
      mode: 'widthFix'
    })

    expect(wrapper.vm.backgroundSize).to.equal('100% auto')
  })
})
