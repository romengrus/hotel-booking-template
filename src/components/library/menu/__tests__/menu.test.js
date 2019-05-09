import path from 'path'
import pug from 'pug'

const qs = '.menu'
const items = [
  {
    name: 'foo',
    href: '/foo',
    isActive: false,
    submenu: []
  },
  {
    name: 'bar',
    href: '/bar',
    isActive: true,
    submenu: []
  }
]
const basedir = global.__BASE_DIR
const templatePath = path.join(__dirname, 'menu.test.pug')
const makeMenu = pug.compileFile(templatePath, { basedir })

describe('Menu', () => {
  test('should throw an error if menu items are not provided', () => {
    expect(() => makeMenu()).toThrowError('no items provided')
  })

  test('menu orientation should be "horizontal" by default', () => {
    document.body.innerHTML = makeMenu({ props: { items } })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('menu', 'menu_horizontal')
  })

  test('menu orientation should be "vertical" if orientation = "vertical"', () => {
    document.body.innerHTML = makeMenu({ props: { items, orientation: 'vertical' } })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('menu', 'menu_vertical')
  })

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeMenu({ props: { items, mods: ['modifier1', 'modifier2'] } })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('modifier1', 'modifier2')
  })
})
