import uuid from 'uuid/v4'
import IMask from 'imask'

class FormFieldDate {
  constructor($el, app) {
    this._id = uuid()
    this.app = app
    this.$el = $el
    this.$input = $el.querySelector('.form-field__input')
    this.mask = IMask(this.$input, {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2999, maxLength: 4 }
      }
    })
    this.init()
  }

  get id() {
    return this._id
  }

  init() {
    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)
  }
}

export function factory(app) {
  const $elements = document.querySelectorAll('.form-field-date')
  $elements.forEach($el => {
    app.registerComponent(new FormFieldDate($el, app))
  })
}
