import { debounce } from '../../scripts/utils';
import { factory } from '../../scripts/factory';

class OffCanvasToggler {
  constructor(el) {
    this.el = el;
    this.connectedWithEl = document.getElementById(el.dataset.connectedWith);
    this.init();
  }

  static getID() {
    return 'off-canvas-toggler';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.handleClick = debounce(this.handleClick.bind(this), 10);
  }

  attachEventHandlers() {
    this.el.addEventListener('click', this.handleClick, true);
  }

  handleClick() {
    if (this.connectedWithEl) {
      this.connectedWithEl.dispatchEvent(new Event('off-canvas:toggle'));
    }
  }
}

factory(OffCanvasToggler);

export { OffCanvasToggler };
