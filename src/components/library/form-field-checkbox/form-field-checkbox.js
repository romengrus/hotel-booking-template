export class FormFieldCheckbox {
  constructor(el) {
    const cls = FormFieldCheckbox.getBaseCSSClass();
    this.el = el;
    this.input = el.querySelector(`${cls}__input`);
    this.customInput = el.querySelector(`${cls}__custom`);
    this.init();
  }

  static getBaseCSSClass() {
    return '.checkbox';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.customInput.addEventListener('click', () => this._handleCustomInputClick());
  }

  _handleCustomInputClick() {
    this.input.checked = !this.input.checked;
  }
}
