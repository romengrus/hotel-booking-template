import uuid from 'uuid/v4'

class FormFieldText {
  constructor($el, app) {
    this._id = uuid()
    this.app = app
    this.$el = $el
    this.$input = $el.querySelector('.form-field__input')
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
  const $elements = document.querySelectorAll('.form-field-text')
  $elements.forEach($el => {
    app.registerComponent(new FormFieldText($el, app))
  })
}
