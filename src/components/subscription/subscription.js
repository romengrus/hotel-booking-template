class Subscription {
  constructor(el) {
    this.el = el;
    this.form = el.querySelector(`[data-form]`);
    this.icon = el.querySelector(`[data-icon]`);
    this.init();
  }

  static getID() {
    return 'subscription';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.icon.addEventListener('click', () => this.form.submit());
  }
}

export { Subscription };
