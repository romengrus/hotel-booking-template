import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

export class Testimonial {
  constructor($el) {
    this.$el = $el;
    this.init();
  }

  static getQuerySelector() {
    return '.testimonial';
  }

  init() {
    timeago.register('ru_RU', ru);
    const $createdAt = this.$el.querySelector('.testimonial__created-at');
    timeago.render($createdAt, 'ru_RU');
    timeago.cancel($createdAt);
  }
}
