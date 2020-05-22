import { pluralize } from '../../utils';

export class Counter {
  constructor(el) {
    const cls = Counter.getBaseCSSClass();
    this.el = el;
    this.input = el.querySelector(`${cls}__input`);
    this.display = el.querySelector(`${cls}__display`);
    this.btnInc = el.querySelector(`${cls}__button-inc`);
    this.btnDec = el.querySelector(`${cls}__button-dec`);
    this.value = this.input.value || 0;
    this.label = el.dataset.label || '';
    this.plurals = JSON.parse(el.dataset.plurals) || [];
    this.step = el.dataset.step || 1;
    this.min = el.dataset.min || 0;
    this.max = el.dataset.max || 100;
    this.id = el.dataset.id;
    this.init();
  }

  static getBaseCSSClass() {
    return '.counter';
  }

  init() {
    this._attachEventHandlers();
  }

  toString() {
    if (this.plurals.length === 3) {
      return `${this.value} ${pluralize(this.value, this.plurals)}`;
    }

    return `${this.value} ${this.label}`;
  }

  _attachEventHandlers() {
    this.btnInc.addEventListener('click', e => this._handleIncButtonClick(e));
    this.btnDec.addEventListener('click', e => this._handleDecButtonClick(e));
    this.el.addEventListener('counter:reset', () => this._handleReset());
  }

  _handleIncButtonClick(e) {
    e.preventDefault();

    if (this.btnInc.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const max = parseInt(this.max, 10);

    let newValue = value + step;

    if (newValue >= max) {
      newValue = max;
      this.btnInc.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.input.value = newValue;
    this.display.textContent = newValue;
    this.btnDec.disabled = false;

    const event = new CustomEvent('counter:increased', {
      detail: {
        id: this.id,
        numValue: newValue,
        strValue: this.toString()
      }
    });
    this.el.dispatchEvent(event);
  }

  _handleDecButtonClick(e) {
    e.preventDefault();

    if (this.btnDec.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const min = parseInt(this.min, 10);

    let newValue = value - step;

    if (newValue <= min) {
      newValue = min;
      this.btnDec.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.input.value = newValue;
    this.display.textContent = newValue;
    this.btnInc.disabled = false;

    const event = new CustomEvent('counter:decreased', {
      detail: {
        id: this.id,
        numValue: newValue,
        strValue: this.toString()
      }
    });
    this.el.dispatchEvent(event);
  }

  _handleReset() {
    this.value = this.min;
    this.display.textContent = this.min;
    this.btnDec.setAttribute('disabled', true);
    this.btnInc.removeAttribute('disabled');
  }
}
