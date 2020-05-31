import { Russian } from 'flatpickr/dist/l10n/ru';
import flatpickr from 'flatpickr';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';

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

  formatValue(calendar) {
    const { altInput } = calendar;
    const { value } = calendar.altInput;
    altInput.value = value.toLocaleLowerCase().replace(/\u2013|\u2014/g, '-');
  }

  createConfig() {
    const next = this.el.querySelector(`[data-${this.id}-next]`);
    const prev = this.el.querySelector(`[data-${this.id}-prev]`);
    const dates = JSON.parse(this.el.dataset.dates) || [];
    const { mode, format, connectedWith } = this.el.dataset;
    const isInline = 'isInline' in this.el.dataset;

    const config = {
      locale: Russian,
      dateFormat: 'd.m.Y',
      altFormat: format,
      altInput: true,
      defaultDate: dates,
      mode,
      inline: isInline,
      nextArrow: next ? next.outerHTML : '>',
      prevArrow: prev ? prev.outerHTML : '<',
      onOpen: () => this.el.classList.add('datepicker_is-opened'),
      onClose: () => this.el.classList.remove('datepicker_is-opened'),
      onReady: [
        (selectedDates, dateStr, instance) => this.setCurrentMonthView(instance),
        (selectedDates, dateStr, instance) => this.formatValue(instance)
      ],
      onMonthChange: (selectedDates, dateStr, instance) => this.setCurrentMonthView(instance),
      onChange: (selectedDates, dateStr, instance) => this.formatValue(instance)
    };

    if (connectedWith) {
      config.plugins = [
        new RangePlugin({
          input: connectedWith,
          position: 'left'
        })
      ];
    }

    return config;
  }

  createDatepicker() {
    const actions = this.el.querySelector(`[data-${this.id}-actions]`);
    const reset = actions.querySelector(`[data-${this.id}-reset]`);
    const ok = actions.querySelector(`[data-${this.id}-ok]`);
    const { mode } = this.el.dataset;
    const config = this.createConfig();

    const datepicker = flatpickr(this.inputEl, config);

    datepicker.$buttonReset = reset;
    datepicker.$buttonOk = ok;

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
