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
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  attachEventHandlers() {
    this.menuToggler.addEventListener('click', this.handleMenuToggle);
    this.menuClose.addEventListener('click', this.handleMenuToggle);
  }

  handleMenuToggle() {
    this.menu.classList.toggle('header__menu_is-visible-on-mobile');
  }
}

export { Header };
