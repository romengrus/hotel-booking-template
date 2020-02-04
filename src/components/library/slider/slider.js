import Swiper from 'swiper';

export class Slider {
  constructor(el) {
    this.el = el;
    this.slider = null;
    this.thumbs = null;
    this.init();
  }

  static getBaseCSSClass() {
    return '.slider';
  }

  init() {
    const sliderContainer = this.el.querySelector('.swiper-container');
    let params = JSON.parse(sliderContainer.dataset.params || {});

    const thumbnailsContainer = this.el.querySelector('.swiper-container-thumbs');

    if (params.showThumbnails && thumbnailsContainer) {
      const thumbnailsParams = JSON.parse(thumbnailsContainer.dataset.params || {});

      // connect main slider with thumbs
      this.thumbs = new Swiper(thumbnailsContainer, thumbnailsParams);
      params = Object.assign(params, { thumbs: { swiper: this.thumbs } });
    }

    this.slider = new Swiper(sliderContainer, params);
  }
}
