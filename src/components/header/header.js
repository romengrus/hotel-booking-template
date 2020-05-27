class Header {
  constructor(el) {
    this.cls = Header.getBaseCSSClass();
    this.el = el;
    this.menu = el.querySelector(`${this.cls}__menu`);
    this.menuToggler = el.querySelector(`${this.cls}__menu-toggler`);
    this.menuClose = el.querySelector(`${this.cls}__menu-close`);
    this.init();
  }

  static getBaseCSSClass() {
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

export { Header };
