import { render as renderTimeAgo, cancel as cancelTimeAgo } from 'timeago.js';

export class Testimonial {
  constructor($el) {
    this.$el = $el;
    this.init();
  }

  static getQuerySelector() {
    return '.testimonial';
  }

  init() {
    const $createdAt = this.$el.querySelector('.testimonial__created-at');
    renderTimeAgo($createdAt);
    cancelTimeAgo($createdAt);
  }
}
