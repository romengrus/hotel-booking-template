import { pluralize } from '../../scripts/utils';
import { factory } from '../../scripts/factory';

class Counter {
  constructor(el) {
    const id = Counter.getID();
    this.el = el;
    this.inputEl = el.querySelector(`[data-${id}-input]`);
    this.displayEl = el.querySelector(`[data-${id}-display]`);
    this.btnIncEl = el.querySelector(`[data-${id}-inc]`);
    this.btnDecEl = el.querySelector(`[data-${id}-dec]`);
    this.value = this.inputEl.value || 0;
    this.label = el.dataset.label || '';
    this.isSpecial = 'isSpecial' in el.dataset;
    this.plurals = JSON.parse(el.dataset.plurals) || [];
    this.step = el.dataset.step || 1;
    this.min = el.dataset.min || 0;
    this.max = el.dataset.max || 100;
    this.id = el.dataset.id;
    this.init();
  }

  static getID() {
    return 'counter';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.handleButtonDecClick = this.handleButtonDecClick.bind(this);
    this.handleButtonIncClick = this.handleButtonIncClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNotify = this.handleNotify.bind(this);
  }

  attachEventHandlers() {
    this.btnIncEl.addEventListener('click', this.handleButtonIncClick);
    this.btnDecEl.addEventListener('click', this.handleButtonDecClick);
    this.el.addEventListener('counter:getValue', this.handleNotify);
    this.el.addEventListener('counter:reset', this.handleReset);
  }

  toString() {
    if (this.plurals.length === 3) {
      return `${this.value} ${pluralize(this.value, this.plurals)}`;
    }

    return `${this.value} ${this.label}`;
  }

  handleButtonIncClick(e) {
    e.preventDefault();

    if (this.btnIncEl.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const max = parseInt(this.max, 10);

    let newValue = value + step;

    if (newValue >= max) {
      newValue = max;
      this.btnIncEl.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.inputEl.value = newValue;
    this.displayEl.textContent = newValue;
    this.btnDecEl.disabled = false;

    const event = new CustomEvent('counter:increased', {
      bubbles: true,
      detail: {
        id: this.id,
        numValue: newValue,
        strValue: this.toString(),
        isSpecial: this.isSpecial
      }
    });
    this.el.dispatchEvent(event);
  }

  handleButtonDecClick(e) {
    e.preventDefault();

    if (this.btnDecEl.disabled) return;

    const value = parseInt(this.value, 10);
    const step = parseInt(this.step, 10);
    const min = parseInt(this.min, 10);

    let newValue = value - step;

    if (newValue <= min) {
      newValue = min;
      this.btnDecEl.setAttribute('disabled', true);
    }

    this.value = newValue;
    this.inputEl.value = newValue;
    this.displayEl.textContent = newValue;
    this.btnIncEl.disabled = false;

    const event = new CustomEvent('counter:decreased', {
      bubbles: true,
      detail: {
        id: this.id,
        numValue: newValue,
        strValue: this.toString(),
        isSpecial: this.isSpecial
      }
    });
    this.el.dispatchEvent(event);
  }

  handleNotify() {
    const value = parseInt(this.value, 10);
    const event = new CustomEvent('counter:notify', {
      bubbles: true,
      detail: {
        id: this.id,
        numValue: value,
        strValue: this.toString(),
        isSpecial: this.isSpecial
      }
    });

    this.el.dispatchEvent(event);
  }

  handleReset() {
    this.value = this.min;
    this.displayEl.textContent = this.min;
    this.btnDecEl.setAttribute('disabled', true);
    this.btnIncEl.removeAttribute('disabled');
  }
}

factory(Counter);

export { Counter };
