class Header {
  constructor(el) {
    const id = Header.getID();
    this.el = el;
    this.menu = el.querySelector(`[data-${id}-menu]`);
    this.menuToggler = el.querySelector(`[data-${id}-menu-toggler]`);
    this.menuClose = el.querySelector(`[data-${id}-menu-close]`);
    this.init();
  }

  static getID() {
    return 'header';
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
