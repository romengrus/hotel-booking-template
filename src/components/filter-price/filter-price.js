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
    this.bindEventListeners();
    this.attachEventListeners();
  }

  bindEventListeners() {
    this.changePrice = this.changePrice.bind(this);
  }

  attachEventListeners() {
    this.sliderEl.addEventListener('range-slider-update', e => this.changePrice(e.detail));
  }

  changePrice(newPrice) {
    this.resultEl.textContent = [].concat(newPrice).join(' - ');
  }
}

export { FilterPrice };
