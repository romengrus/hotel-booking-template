import { factory } from '../../scripts/factory';

class FilterPrice {
  constructor(el) {
    const id = FilterPrice.getID();
    this.el = el;
    this.resultEl = this.el.querySelector(`[data-${id}-result]`);
    this.sliderEl = this.el.querySelector(`[data-${id}-slider] [data-range-slider]`);
    this.init();
  }

  static getID() {
    return 'filter-price';
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.sliderEl.addEventListener('range-slider-update', e => this.handleSliderUpdate(e.detail));
  }

  handleSliderUpdate = newPrice => {
    this.resultEl.textContent = [].concat(newPrice).join(' - ');
  };
}

factory(FilterPrice);

export { FilterPrice };
