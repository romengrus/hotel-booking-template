export class Panel {
  constructor($el) {
    this.$el = $el;
    this.$toggler = $el.querySelector('.panel__toggler');
    this.$header = $el.querySelector('.panel__header');
    this.$body = $el.querySelector('.panel__body');
    this.isCollapsible = 'isCollapsible' in $el.dataset;
    this.init();
  }

  static getQuerySelector() {
    return '.panel';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    if (this.isCollapsible) {
      this.$header.addEventListener('click', e => this._handleHeaderClick(e));
    }
  }

  _handleHeaderClick() {
    const { $body, $toggler } = this;
    $body.classList.toggle('panel__body_collapsed');
    $toggler.classList.toggle('panel__toggler_collapsed');
  }
}
