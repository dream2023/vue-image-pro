describe('vue-image-pro', () => {
  const getStyle = function (el, expectStyles) {
    const style = el[0].style
    const res = {}
    expectStyles.forEach(attr => {
      res[attr] = style[attr]
    })
    return res
  }

  beforeEach(() => {
    cy.visit('/')
  })
  it('vue-image-pro image mode', () => {
    const testData = [
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-size': '177% 100%'
        }
      },
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '50px',
          height: '100px',
          'background-size': '355% 100%'
        }
      },
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-size': '100px 100px'
        }
      },
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-size': 'contain'
        }
      },
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-size': '100%'
        }
      },
      {
        styles: ['width', 'height', 'background-size'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-size': 'auto 100%'
        }
      },
      {
        styles: ['width', 'height', 'background-color'],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(251, 212, 16)'
        }
      },
      {
        styles: ['background-image'],
        expectValues: {
          'background-image': 'url("https://dwz.cn/q4z3fZF1")'
        }
      }
    ]
    cy.get('.demo.vue-image-pro--image').each(($el, index) => {
      const styles = getStyle($el, testData[index].styles)
      expect(styles).to.deep.eq(testData[index].expectValues)
    })
  })

  it('vue-image-pro avatar mode', () => {
    const testData = [
      {
        styles: ['width', 'height', 'font', 'color', 'border-radius'],
        expectValues: {
          width: '100px',
          height: '100px',
          'border-radius': '50%',
          color: 'rgb(255, 255, 137)',
          font: '55px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: 'Z'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(0, 0, 0)',
          'border-radius': '50%',
          color: 'rgb(255, 255, 255)',
          font: '35px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: '张超'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(64, 158, 255)',
          'border-radius': '50%',
          color: 'rgb(144, 238, 255)',
          font: '41px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: 'ZC'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(64, 158, 255)',
          'border-radius': '50%',
          color: 'rgb(144, 238, 255)',
          font: '33px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: 'ZCJ'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(64, 158, 255)',
          'border-radius': '50%',
          color: 'rgb(144, 238, 255)',
          font: '55px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: '张'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'opacity',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          opacity: '0.4',
          'background-color': 'rgb(0, 0, 0)',
          'border-radius': '50%',
          color: 'rgb(103, 194, 58)',
          font: '27px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: '张超杰'
      },
      {
        styles: [
          'width',
          'height',
          'font',
          'color',
          'background-color',
          'border-radius'
        ],
        expectValues: {
          width: '100px',
          height: '100px',
          'background-color': 'rgb(63, 81, 181)',
          'border-radius': '50%',
          color: 'rgb(143, 161, 255)',
          font: '27px/105px "bold Helvetica", Arial, sans-serif'
        },
        text: '插槽'
      }
    ]
    cy.get('.demo.vue-image-pro--avatar').each(($el, index) => {
      const styles = getStyle($el, testData[index].styles)
      expect(styles).to.deep.eq(testData[index].expectValues)
      expect($el[0].textContent).to.deep.eq(testData[index].text)
    })
  })
})
