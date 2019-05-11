export class Counter {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.querySelector('.counter__input');
    this.$display = $el.querySelector('.counter__display');
    this.$btnInc = $el.querySelector('.counter__button-inc');
    this.$btnDec = $el.querySelector('.counter__button-dec');
    this.value = this.$input.value || 0;
    this.step = $el.dataset.step || 1;
    this.min = $el.dataset.min || 0;
    this.max = $el.dataset.max || 100;
    this.init();
  }

  static getQuerySelector() {
    return '.counter';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$btnInc.addEventListener('click', e => this._handleIncButtonClick(e));
    this.$btnDec.addEventListener('click', e => this._handleDecButtonClick(e));
  }

  _handleIncButtonClick() {
    if (this.$btnInc.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const max = parseInt(this.max, 10);

    let newValue = value + step;

    if (newValue >= max) {
      newValue = max;
      this.$btnInc.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.$input.value = newValue;
    this.$display.textContent = newValue;
    this.$btnDec.disabled = false;

    const event = new CustomEvent('counter:increased', { detail: newValue });
    this.$el.dispatchEvent(event);
  }

  _handleDecButtonClick() {
    if (this.$btnDec.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const min = parseInt(this.min, 10);

    let newValue = value - step;

    if (newValue <= min) {
      newValue = min;
      this.$btnDec.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.$input.value = newValue;
    this.$display.textContent = newValue;
    this.$btnInc.disabled = false;

    const event = new CustomEvent('counter:decreased', { detail: newValue });
    this.$el.dispatchEvent(event);
  }
}
