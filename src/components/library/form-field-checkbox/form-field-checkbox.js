export class FormFieldCheckbox {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.querySelector('.checkbox__input');
    this.$customInput = $el.querySelector('.checkbox__custom');
    this.init();
  }

  static getQuerySelector() {
    return '.checkbox';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$customInput.addEventListener('click', () => this._handleCustomInputClick());
  }

  _handleCustomInputClick() {
    this.$input.checked = !this.$input.checked;
  }
}
