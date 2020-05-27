class Panel {
  constructor(el) {
    const id = Panel.getID();
    this.el = el;
    this.toggler = el.querySelector(`[data-${id}-toggler]`);
    this.header = el.querySelector(`[data-${id}-header]`);
    this.body = el.querySelector(`[data-${id}-body]`);
    this.isCollapsible = 'isCollapsible' in el.dataset;
    this.init();
  }

  static getID() {
    return 'panel';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    if (this.isCollapsible) {
      this.header.addEventListener('click', e => this._handleHeaderClick(e));
    }
  }

  _handleHeaderClick() {
    this.el.classList.toggle('panel_is-collapsed');
  }
}

export { Panel };
