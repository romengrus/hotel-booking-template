import path from 'path'
import pug from 'pug'

const basedir = global.__BASE_DIR
const templatePath = path.join(__dirname, 'form-field.test.pug')
const makeField = pug.compileFile(templatePath, { basedir })

describe('Form Field', () => {
  test('should render without props', () => {
    document.body.innerHTML = makeField()
    const $el = document.querySelector('.form-field')
    expect($el).toBeInTheDocument()
    expect($el.outerHTML).toBe('<input class="form-field">')
  })

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeField({ props: { mods: ['modifier1', 'modifier2'] } })
    const $el = document.querySelector('.form-field')
    expect($el).toHaveClass('form-field', 'modifier1', 'modifier2')
  })

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeField({
      attributes: { type: 'text', required: true, 'data-foo': 'bar' }
    })
    const $el = document.querySelector('.form-field')
    expect($el).toHaveAttribute('type', 'text')
    expect($el).toHaveAttribute('required')
    expect($el).toHaveAttribute('data-foo', 'bar')
  })
})
