import Pikaday from 'pikaday'
import uuid from 'uuid/v4'
import datepickerI18n from '../../../i18n/datepicker'

const lang = 'ru'

class Datepicker {
  constructor($el, app) {
    this._id = uuid()
    this.app = app
    this.$el = $el
    const boundedInputId = $el.getAttribute('data-input-id')
    this.$boundedInput = document.getElementById(boundedInputId)
    this.$btnReset = $el.querySelector('.datepicker__button-reset')
    this.$btnOk = $el.querySelector('.datepicker__button-ok')
    this.picker = this._createPicker()
    this.init()
    this.render()
  }

  get id() {
    return this._id
  }

  init() {
    this._attachEventHandlers()

    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)
    // set initial date in bounded input
    if (this.$boundedInput) {
      this.$boundedInput.value = this.getDate()
    }
  }

  render() {
    const { picker } = this
    const container = this.$el.querySelector('.datepicker__content')
    container.appendChild(picker.el)
  }

  getDate() {
    return this.picker.toString('DD.MM.YYYY')
  }

  _createPicker() {
    const { boundedInputId } = this

    return new Pikaday({
      i18n: datepickerI18n[lang],
      field: boundedInputId,
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true,
      defaultDate: new Date(),
      setDefaultDate: true,
      onSelect: () => {
        if (this.$boundedInput) {
          this.$boundedInput.value = this.getDate()
        }
      }
    })
  }

  _attachEventHandlers() {
    this.$btnReset.addEventListener('click', () => this._handleBtnResetClick())
    this.$btnOk.addEventListener('click', () => this._handleBtnOkClick())
  }

  _handleBtnResetClick() {
    this.picker.setDate(new Date())
    if (this.$boundedInput) {
      this.$boundedInput.value = this.getDate()
    }
  }

  _handleBtnOkClick() {
    if (this.$boundedInput) {
      this.$boundedInput.value = this.getDate()
    }
  }
}

export function factory(app) {
  const $datepickers = document.querySelectorAll('.datepicker')
  $datepickers.forEach($el => {
    app.registerComponent(new Datepicker($el, app))
  })
}
