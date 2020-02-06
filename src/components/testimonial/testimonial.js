import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

export class Testimonial {
  constructor(el) {
    this.cls = Testimonial.getBaseCSSClass();
    this.el = el;
    this.init();
  }

  static getBaseCSSClass() {
    return '.testimonial';
  }

  init() {
    timeago.register('ru_RU', ru);
    const createdAt = this.el.querySelector(`${this.cls}__created-at`);
    timeago.render(createdAt, 'ru_RU');
    timeago.cancel(createdAt);
  }
}
