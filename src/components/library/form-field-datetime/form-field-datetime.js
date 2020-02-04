import { Russian } from 'flatpickr/dist/l10n/ru';
import flatpickr from 'flatpickr';
import IMask from 'imask';

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
    this.cls = FormFieldDatetime.getBaseCSSClass();
    this.lang = 'ru';
    this.$el = $el;
    this.$input = $el.querySelector(`${this.cls}__input`);
    this.$icon = $el.querySelector(`${this.cls}__icon`);
    this.mask = null;
    this.datepicker = null;
    this.init();
  }

  static getBaseCSSClass() {
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
    const $nextArrow = this.$el.querySelector(`${this.cls}__icon-next`);
    const $prevArrow = this.$el.querySelector(`${this.cls}__icon-prev`);
    const $actionsPanel = this.$el.querySelector(`${this.cls}__actions-panel`);
    const $buttonReset = $actionsPanel.querySelector(`${this.cls}__reset`);
    const $buttonOk = $actionsPanel.querySelector(`${this.cls}__ok`);
    const $toggler = this.$el.querySelector(`${this.cls}__icon-toggle`);

    const datepicker = flatpickr(this.$el, {
      locale: getDatepickerLocale(this.lang),
      altInput: true,
      altInputClass: 'form-field',
      altFormat: this.$input.dataset.dateFormat || 'd.m.Y',
      defaultDate: this.$input.dataset.defaultDate,
      wrap: true,
      mode: this.$input.dataset.datepickerMode || 'single',
      nextArrow: $nextArrow ? $nextArrow.outerHTML : '>',
      prevArrow: $prevArrow ? $prevArrow.outerHTML : '<'
    });

    datepicker.$buttonReset = $buttonReset;
    datepicker.$buttonOk = $buttonOk;
    datepicker.config.onOpen.push(() =>
      $toggler.classList.remove('form-field-datetime__icon-toggle_collapsed')
    );
    datepicker.config.onClose.push(() =>
      $toggler.classList.add('form-field-datetime__icon-toggle_collapsed')
    );

    // handle action buttons click event
    $buttonReset.addEventListener('click', () => datepicker.clear());
    $buttonOk.addEventListener('click', () => datepicker.close());

    // move actions panel inside datepicker container
    datepicker.calendarContainer.appendChild($actionsPanel);

    return datepicker;
  }
}
