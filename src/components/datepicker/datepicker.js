import { Russian } from 'flatpickr/dist/l10n/ru';
import flatpickr from 'flatpickr';

const monthNumberToName = n =>
  [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ][n];

class Datepicker {
  constructor(el) {
    this.id = Datepicker.getID();
    this.el = el;
    this.inputEl = el.querySelector(`[data-${this.id}-input]`);
    this.togglerEl = el.querySelector(`[data-${this.id}-toggler]`);
    this.datepicker = null;
    this.init();
  }

  static getID() {
    return 'datepicker';
  }

  init() {
    this.createDatepicker();
  }

  setCurrentMonthView(calendar) {
    const monthName = monthNumberToName(calendar.currentMonth);
    const currentDate = `${monthName} ${calendar.currentYear}`;
    const currentDateContainer = calendar.calendarContainer.querySelector(
      '.flatpickr-current-month'
    );
    currentDateContainer.innerHTML = currentDate;
  }

  createDatepicker() {
    const next = this.el.querySelector(`[data-${this.id}-next]`);
    const prev = this.el.querySelector(`[data-${this.id}-prev]`);
    const actions = this.el.querySelector(`[data-${this.id}-actions]`);
    const reset = actions.querySelector(`[data-${this.id}-reset]`);
    const ok = actions.querySelector(`[data-${this.id}-ok]`);

    const dates = JSON.parse(this.inputEl.dataset.dates) || [];
    const { mode } = this.inputEl.dataset;
    const isInline = 'isInline' in this.inputEl.dataset;

    const datepicker = flatpickr(this.inputEl, {
      locale: Russian,
      dateFormat: 'd.m.Y',
      defaultDate: dates,
      mode,
      inline: isInline,
      nextArrow: next ? next.outerHTML : '>',
      prevArrow: prev ? prev.outerHTML : '<',
      onReady: (selectedDates, dateStr, instance) => this.setCurrentMonthView(instance),
      onMonthChange: (selectedDates, dateStr, instance) => this.setCurrentMonthView(instance)
    });

    datepicker.$buttonReset = reset;
    datepicker.$buttonOk = ok;
    datepicker.config.onOpen.push(() => this.el.classList.add('datepicker_is-opened'));
    datepicker.config.onClose.push(() => this.el.classList.remove('datepicker_is-opened'));

    // handle action buttons click event
    reset.addEventListener('click', datepicker.clear);
    ok.addEventListener('click', datepicker.close);

    // move actions panel inside datepicker container
    if (mode !== 'single') {
      datepicker.calendarContainer.appendChild(actions);
    }
  }
}

export { Datepicker };
