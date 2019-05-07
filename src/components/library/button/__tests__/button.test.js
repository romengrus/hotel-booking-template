import path from 'path'
import pug from 'pug'
import sinon from 'sinon'
import { fireEvent } from 'dom-testing-library'
import { Button } from '../button'

const qs = Button.getQuerySelector()
const basedir = global.__BASE_DIR
const templatePath = path.join(__dirname, 'button.test.pug')
const makeButton = pug.compileFile(templatePath, { basedir })

afterEach(() => sinon.restore())

describe('Button', () => {
  test('static getQuerySelector() should return component css selector', () => {
    expect(Button.getQuerySelector()).toBe('.button')
  })

  test('should render without props', () => {
    const html = makeButton()
    document.body.innerHTML = html
    const $el = document.querySelector(qs)
    expect($el).toBeInTheDocument()
    expect(html).toBe('<button class="button button_is-rounded"></button>')
  })

  test('should be "BUTTON" tag by default', () => {
    document.body.innerHTML = makeButton()
    const $el = document.querySelector(qs)
    expect($el.tagName).toBe('BUTTON')
  })

  test('should be "BUTTON" tag when type = "button"', () => {
    const props = { type: 'button' }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el.tagName).toBe('BUTTON')
  })

  test('should be "A" tag when type = "link"', () => {
    const props = { type: 'link' }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el.tagName).toBe('A')
  })

  test('should render provided value', () => {
    const value = 'test value'
    const props = { value }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveTextContent(value)
  })

  test('should have modifier for rounded corners by default', () => {
    document.body.innerHTML = makeButton()
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-rounded')
  })

  test('should have modifier for outlined style when isOutlined = true', () => {
    const props = { isOutlined: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-outlined')
  })

  test('should have modifier for text-like style when isText = true', () => {
    const props = { isText: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-text')
  })

  test('should apply proper modifiers and attributes when type="link" & isDisabled=true', () => {
    const props = { type: 'link', isDisabled: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-disabled')
  })

  test('should apply proper modifiers and attributes when type="button" & isDisabled=true', () => {
    const props = { type: 'button', isDisabled: true }
    document.body.innerHTML = makeButton({ props })
    const $button = document.querySelector(qs)
    expect($button).toHaveClass('button', 'button_is-disabled')
    expect($button).toBeDisabled()
  })

  test('should be expanded if isExpanded = true', () => {
    const props = { isExpanded: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-expanded')
  })

  test('should have modifier for ripple effect if hasRipple=true', () => {
    const props = { hasRipple: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_has-ripple')
  })

  test('should not have modifier for ripple effect if isDisabled=true', () => {
    const props = { hasRipple: true, isDisabled: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-disabled')
  })

  test('should render icon on the right side by default', () => {
    const props = { iconName: 'arrow-right' }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_has-icon')
    const $icon = $el.querySelector('.icon')
    expect($icon).toHaveClass('icon', 'button__icon', 'button__icon_right', 'icon-arrow-right')
  })

  test('should render icon on the left side if iconPosition = "left"', () => {
    const props = { iconName: 'arrow-left', iconPosition: 'left' }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_has-icon')
    const $icon = $el.querySelector('.icon')
    expect($icon).toHaveClass('icon', 'button__icon', 'button__icon_left', 'icon-arrow-left')
  })

  test('should add modifier classes if provided', () => {
    const props = { mods: ['modifier1', 'modifier2'] }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    expect($el).toHaveClass('button', 'button_is-rounded', 'modifier1', 'modifier2')
  })

  test('should show ripple effect on click', () => {
    const props = { value: 'BUTTON', hasRipple: true }
    document.body.innerHTML = makeButton({ props })
    const $el = document.querySelector(qs)
    const $button = new Button($el)
    const spy = sinon.spy($button, '_showRipple')
    fireEvent.click($el)
    expect(spy.called).toBe(true)
  })
})
