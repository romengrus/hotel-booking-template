import Swiper from 'swiper';

export class Slider {
  constructor($el) {
    this.$el = $el;
    this.params = JSON.parse($el.dataset.params);
    this.slider = null;
    this.init();
  }

  static getQuerySelector() {
    return '.swiper-container';
  }

  init() {
    this.slider = new Swiper(this.$el, this.params);
  }
}
