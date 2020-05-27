import { Russian } from 'flatpickr/dist/l10n/ru';
import flatpickr from 'flatpickr';

class Datepicker {
  constructor(el) {
    this.cls = Datepicker.getBaseCSSClass();
    this.el = el;
    this.input = el.querySelector(`${this.cls}__input input[type="text"]`);
    this.toggler = el.querySelector(`${this.cls}__toggler`);
    this.datepicker = null;
    this.init();
  }

  static getBaseCSSClass() {
    return '.datepicker';
  }

  init() {
    this._createDatepicker();
  }

  _createDatepicker() {
    const next = this.el.querySelector(`${this.cls}__next`);
    const prev = this.el.querySelector(`${this.cls}__prev`);
    const actions = this.el.querySelector(`${this.cls}__actions`);
    const reset = actions.querySelector(`${this.cls}__reset`);
    const ok = actions.querySelector(`${this.cls}__ok`);

    const dates = JSON.parse(this.input.dataset.dates) || [];
    const mode = this.input.dataset.mode || 'single';
    const isOpended = this.input.dataset.isOpened || false;

    const datepicker = flatpickr(this.input, {
      locale: Russian,
      dateFormat: 'd.m.Y',
      defaultDate: dates.map(Date),
      mode,
      nextArrow: next ? next.outerHTML : '>',
      prevArrow: prev ? prev.outerHTML : '<'
    });

    datepicker.$buttonReset = reset;
    datepicker.$buttonOk = ok;
    datepicker.config.onOpen.push(() => this.el.classList.add('datepicker_is-opened'));
    datepicker.config.onClose.push(() => this.el.classList.remove('datepicker_is-opened'));

    // handle action buttons click event
    reset.addEventListener('click', () => datepicker.clear());
    ok.addEventListener('click', () => datepicker.close());

    // move actions panel inside datepicker container
    if (mode !== 'single') {
      datepicker.calendarContainer.appendChild(actions);
    }

    if (isOpended) {
      datepicker.open();
    }
  }
}

export { Datepicker };
