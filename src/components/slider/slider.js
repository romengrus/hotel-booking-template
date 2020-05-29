import Swiper from 'swiper';

class Slider {
  constructor(el) {
    this.el = el;
    this.id = Slider.getID();
    this.slider = null;
    this.init();
  }

  static getID() {
    return 'slider';
  }

  init() {
    const sliderContainer = this.el.querySelector(`[data-${this.id}-container]`);
    const params = JSON.parse(sliderContainer.dataset.params || {});

    this.slider = new Swiper(sliderContainer, params);
  }
}

export { Slider };
