import IMask from 'imask';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';

const lang = 'ru';

function getDatepickerLocale(language = 'en') {
  switch (language) {
    case 'ru':
      return Russian;
    default:
      return null;
  }
}

export class FormFieldDatetime {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.querySelector('.form-field-datetime__input');
    this.$icon = $el.querySelector('.form-field-datetime__icon');
    this.mask = null;
    this.datepicker = null;
    this.init();
  }

  static getQuerySelector() {
    return '.form-field-datetime';
  }

  init() {
    if ('useDatepicker' in this.$input.dataset) {
      this.datepicker = this._createDatepicker();
    } else {
      this.mask = this._createMask();
    }

    this._attachComponentToDOMElement();
  }

  _attachComponentToDOMElement() {
    this.$el.__component = this;
  }

  _createMask() {
    return IMask(this.$input, {
      mask: Date,
      pattern: this.$input.dataset.dateFormat || 'd.m.Y',
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2999, maxLength: 4 }
      }
    });
  }

  _createDatepicker() {
    const $nextArrow = this.$el.querySelector('.form-field-datetime__icon-next');
    const $prevArrow = this.$el.querySelector('.form-field-datetime__icon-prev');
    const $actionsPanel = this.$el.querySelector('.form-field-datetime__actions-panel');
    const $buttonReset = $actionsPanel.querySelector('.form-field-datetime__reset');
    const $buttonOk = $actionsPanel.querySelector('.form-field-datetime__ok');

    const datepicker = flatpickr(this.$el, {
      locale: getDatepickerLocale(lang),
      altInput: false,
      altFormat: this.$input.dataset.dateFormat || 'd.m.Y',
      wrap: true,
      mode: this.$input.dataset.datepickerMode || 'single',
      nextArrow: $nextArrow ? $nextArrow.outerHTML : '>',
      prevArrow: $prevArrow ? $prevArrow.outerHTML : '<'
    });

    datepicker.$buttonReset = $buttonReset;
    datepicker.$buttonOk = $buttonOk;

    // handle action buttons click event
    $buttonReset.addEventListener('click', () => datepicker.clear());
    $buttonOk.addEventListener('click', () => datepicker.close());

    // move actions panel inside datepicker container
    datepicker.calendarContainer.appendChild($actionsPanel);

    return datepicker;
  }
}
