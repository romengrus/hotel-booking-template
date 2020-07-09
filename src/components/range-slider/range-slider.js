import NUIRangeSlider from 'nouislider';
import wNumb from 'wnumb';
import { factory } from '../../scripts/factory';

class RangeSlider {
  constructor(el) {
    const id = RangeSlider.getID();
    this.el = el;
    this.sliderEl = el.querySelector(`[data-${id}-slider]`);
    this.inputEl = el.querySelector(`[data-${id}-input]`);
    this.params = JSON.parse(this.inputEl.dataset.params);
    this.slider = null;
    this.init();
  }

  static getID() {
    return 'range-slider';
  }

  init() {
    this.createSlider();
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.slider.on('update', this.handleSliderUpdate);
  }

  createSlider() {
    // Adjust formatting options if any
    if (this.params.format) {
      this.params.format = wNumb(this.params.format);
    }
    // Change default cssPrefix
    const params = { ...this.params, cssPrefix: 'range-slider-' };
    this.slider = NUIRangeSlider.create(this.sliderEl, params);
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
  handleSliderUpdate = (values, handle, unencoded, tap, positions) => {
    this.inputEl.value = JSON.stringify(this.slider.get());
    this.el.dispatchEvent(new CustomEvent('range-slider-update', { detail: this.slider.get() }));
  };
}

factory(RangeSlider);

export { RangeSlider };
