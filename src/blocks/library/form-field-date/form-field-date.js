import uuid from 'uuid/v4'
import IMask from 'imask'
import flatpickr from 'flatpickr'

class FormFieldDate {
  constructor($el, app) {
    this._id = uuid()
    this.app = app
    this.$el = $el
    this.$input = $el.querySelector('.c-datetime__input')
    this.$icon = $el.querySelector('.c-datetime__icon')
    this.mask = null
    this.datepicker = null
    this.init()
  }

  get id() {
    return this._id
  }

  init() {
    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)

    if (this.$input.dataset.useDatepicker) {
      this.datepicker = this._createDatepicker()
    } else {
      this.mask = this._createMask()
    }
  }

  _createMask() {
    return IMask(this.$input, {
      mask: Date,
      pattern: this.$input.dataset.dateFormat,
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2999, maxLength: 4 }
      }
    })
  }

  _createDatepicker() {
    return flatpickr(this.$el, {
      wrap: true
    })
  }
}

export function factory(app) {
  const $elements = document.querySelectorAll('.c-datetime')
  $elements.forEach($el => {
    app.registerComponent(new FormFieldDate($el, app))
  })
}
