class Panel {
  constructor(el) {
    this.cls = Panel.getBaseCSSClass();
    this.el = el;
    this.toggler = el.querySelector(`${this.cls}__toggler`);
    this.header = el.querySelector(`${this.cls}__header`);
    this.body = el.querySelector(`${this.cls}__body`);
    this.isCollapsible = 'isCollapsible' in el.dataset;
    this.init();
  }

  static getBaseCSSClass() {
    return '.panel';
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
