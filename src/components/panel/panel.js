import { factory } from '../../scripts/factory';

class Panel {
  constructor(el) {
    const id = Panel.getID();
    this.el = el;
    this.togglerEl = el.querySelector(`[data-${id}-toggler]`);
    this.headerEl = el.querySelector(`[data-${id}-header]`);
    this.bodyEl = el.querySelector(`[data-${id}-body]`);
    this.isCollapsible = 'isCollapsible' in el.dataset;
    this.init();
  }

  static getID() {
    return 'panel';
  }

  init() {
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    if (this.isCollapsible) {
      this.headerEl.addEventListener('click', this.handleHeaderClick);
    }
  }

  handleHeaderClick = () => {
    this.el.classList.toggle('panel_is-collapsed');
  };
}

factory(Panel);

export { Panel };
