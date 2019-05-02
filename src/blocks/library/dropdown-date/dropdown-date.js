import uuid from 'uuid/v4'

class DropdownDate {
  constructor($el, app) {
    this._id = uuid()
    this.app = app
    this.$el = $el
    const datepickerComponentId = $el.querySelector('.datepicker').getAttribute('data-component-id')
    this.datepicker = app.getComponent(datepickerComponentId)
    this.$input = $el.querySelector('.form-field-dropdown > input')
    this.$icon = $el.querySelector('.dropdown-date__icon')
    this.$footer = $el.querySelector('.dropdown-date__footer')
    this.init()
  }

  get id() {
    return this._id
  }

  init() {
    this._attachEventHandlers()

    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)
  }

  toggleDatepicker() {
    const footerHiddenClass = 'dropdown-date__footer_hidden'
    if (this.$footer.classList.contains(footerHiddenClass)) {
      this.$footer.classList.remove(footerHiddenClass)
    } else {
      this.$footer.classList.add(footerHiddenClass)
    }
  }

  _attachEventHandlers() {
    this.$icon.addEventListener('click', () => this.toggleDatepicker())
    this.$input.addEventListener('focus', () => this.toggleDatepicker())
    this.datepicker.$btnOk.addEventListener('click', () => this.toggleDatepicker())
  }
}

export function factory(app) {
  const $components = document.querySelectorAll('.dropdown-date')
  $components.forEach($el => {
    app.registerComponent(new DropdownDate($el, app))
  })
}
