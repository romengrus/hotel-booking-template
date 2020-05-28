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
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    if (this.menuToggler) {
      this.menuToggler.addEventListener('click', () => this.toggleMenu());
    }

    if (this.menuClose) {
      this.menuClose.addEventListener('click', () => this.toggleMenu());
    }
  }

  toggleMenu() {
    this.menu.classList.toggle('header__menu_is-visible-on-mobile');
  }
}

export { Header };
