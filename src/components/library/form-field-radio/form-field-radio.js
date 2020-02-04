export class FormFieldRadio {
  constructor($el) {
    this.cls = FormFieldRadio.getBaseCSSClass();
    this.$el = $el;
    this.$input = $el.querySelector(`${this.cls}__input`);
    this.$customInput = $el.querySelector(`${this.cls}__custom`);
    this.init();
  }

  static getBaseCSSClass() {
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
