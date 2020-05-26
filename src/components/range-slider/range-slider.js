import NUIRangeSlider from 'nouislider';
import wNumb from 'wnumb';

class RangeSlider {
  constructor(el) {
    this.cls = RangeSlider.getBaseCSSClass();
    this.el = el;
    this.sliderEl = el.querySelector(`${this.cls}__slider`);
    this.input = el.querySelector(`${this.cls}__input input`);
    this.params = JSON.parse(this.input.dataset.params);
    this.slider = null;
    this.init();
  }

  static getBaseCSSClass() {
    return '.range-slider';
  }

  init() {
    // Adjust formatting options if any
    if (this.params.format) {
      this.params.format = wNumb(this.params.format);
    }

    // Change default cssPrefix
    const params = { ...this.params, cssPrefix: 'range-slider-' };

    this.slider = NUIRangeSlider.create(this.sliderEl, params);

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
    this.input.value = JSON.stringify(this.slider.get());
  }
}

export { RangeSlider };
