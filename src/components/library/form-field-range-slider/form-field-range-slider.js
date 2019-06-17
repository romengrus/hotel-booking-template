import RangeSlider from 'nouislider';
import wNumb from 'wnumb';

export class FormFieldRangeSlider {
  constructor($el) {
    this.$el = $el;
    this.$slider = $el.querySelector('.form-field-range-slider__slider');
    this.$input = $el.querySelector('.form-field-range-slider__input');
    this.$display = $el.querySelector('.form-field-range-slider__display');
    this.params = JSON.parse(this.$input.dataset.params);
    this.showValue = 'showValue' in this.$input.dataset;
    this.slider = null;
    this.init();
  }

  static getQuerySelector() {
    return '.form-field-range-slider';
  }

  init() {
    // Adjust formatting options if any
    if (this.params.format) {
      this.params.format = wNumb(this.params.format);
    }

    // Change default cssPrefix
    const params = { ...this.params, cssPrefix: 'range-slider-' };

    this.slider = RangeSlider.create(this.$slider, params);

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.slider.on('update', this._handleSliderUpdate.bind(this));
  }

  /**
   * Handler for slider update event
   * @param {array} values Current slider values (array);
   * @param {number} handle Handle that caused the event (number);
   * @param {array} unencoded Slider values without formatting
   * @param {boolean} tap Event was caused by the user tapping the slider
   * @param {array} positions Left offset of the handles
   */
  // eslint-disable-next-line no-unused-vars
  _handleSliderUpdate(values, handle, unencoded, tap, positions) {
    if (this.showValue) {
      this.$display.innerText = values.join(' - ');
    }

    this.$input.value = JSON.stringify(this.slider.get());
  }
}
