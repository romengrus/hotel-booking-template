import { Russian } from 'flatpickr/dist/l10n/ru';
import flatpickr from 'flatpickr';

class Datepicker {
  constructor(el) {
    this.id = Datepicker.getID();
    this.el = el;
    this.input = el.querySelector(`[data-${this.id}-input]`);
    this.toggler = el.querySelector(`[data-${this.id}-toggler]`);
    this.datepicker = null;
    this.init();
  }

  static getID() {
    return 'datepicker';
  }

  init() {
    this.createDatepicker();
  }

  createDatepicker() {
    const next = this.el.querySelector(`[data-${this.id}-next]`);
    const prev = this.el.querySelector(`[data-${this.id}-prev]`);
    const actions = this.el.querySelector(`[data-${this.id}-actions]`);
    const reset = actions.querySelector(`[data-${this.id}-reset]`);
    const ok = actions.querySelector(`[data-${this.id}-ok]`);

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
