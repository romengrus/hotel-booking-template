export class FormFieldRadio {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.querySelector('.radio__input');
    this.$customInput = $el.querySelector('.radio__custom');
    this.init();
  }

  static getQuerySelector() {
    return '.radio';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$customInput.addEventListener('click', () => this._handleCustomInputClick());
  }

  _handleCustomInputClick() {
    this.$input.checked = true;
  }
}
