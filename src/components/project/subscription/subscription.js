export class Subscription {
  constructor($el) {
    this.$el = $el;
    this.$form = $el.querySelector('.form');
    this.$icon = $el.querySelector('.icon');
    this.init();
  }

  static getQuerySelector() {
    return '.subscription';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$icon.addEventListener('click', () => this.$form.submit());
  }
}
