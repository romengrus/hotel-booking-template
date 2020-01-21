export class Header {
  constructor($el) {
    this.$el = $el;
    this.menu = $el.querySelector('.js-header__menu');
    this.menuToggler = $el.querySelector('.js-header__menu-toggler');
    this.menuClose = $el.querySelector('.js-header__menu-close');
    this.init();
  }

  static getQuerySelector() {
    return '.header';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    if (this.menuToggler) {
      this.menuToggler.addEventListener('click', () => this._toggleMenu());
    }

    if (this.menuClose) {
      this.menuClose.addEventListener('click', () => this._toggleMenu());
    }
  }

  _toggleMenu() {
    this.menu.classList.toggle('header__menu_is-visible-on-mobile');
  }
}
