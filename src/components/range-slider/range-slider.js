import NUIRangeSlider from 'nouislider';
import wNumb from 'wnumb';

class RangeSlider {
  constructor(el) {
    const id = RangeSlider.getID();
    this.el = el;
    this.sliderEl = el.querySelector(`[data-${id}-slider]`);
    this.input = el.querySelector(`[data-${id}-input]`);
    this.params = JSON.parse(this.input.dataset.params);
    this.slider = null;
    this.init();
  }

  static getID() {
    return 'range-slider';
  }

  init() {
    // Adjust formatting options if any
    if (this.params.format) {
      this.params.format = wNumb(this.params.format);
    }

    // Change default cssPrefix
    const params = { ...this.params, cssPrefix: 'range-slider-' };

    this.slider = NUIRangeSlider.create(this.sliderEl, params);

    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.slider.on('update', this.handleSliderUpdate.bind(this));
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
  handleSliderUpdate(values, handle, unencoded, tap, positions) {
    this.input.value = JSON.stringify(this.slider.get());
    this.el.dispatchEvent(new CustomEvent('range-slider-update', { detail: this.slider.get() }));
  }
}

export { RangeSlider };
