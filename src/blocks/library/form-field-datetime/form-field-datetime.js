import IMask from 'imask'
import flatpickr from 'flatpickr'
import Component from '../../Component'

class FormFieldDate extends Component {
  constructor($el, app) {
    super($el, app)
    this.$input = $el.querySelector('.form-field-datetime__input')
    this.$icon = $el.querySelector('.form-field-datetime__icon')
    this.mask = null
    this.datepicker = null
    this.init()
  }

  static getDomSelector() {
    return '.form-field-datetime'
  }

  init() {
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

export default FormFieldDate
