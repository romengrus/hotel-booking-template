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
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.el.addEventListener('click', this.handleClick);
  }

  // debounce is used because child elements can trigger click event
  // (f.ex input inside label)
  handleClick = debounce(() => {
    if (this.connectedWithEl) {
      this.connectedWithEl.dispatchEvent(new Event('off-canvas:toggle'));
    }
  }, 10);
}

factory(OffCanvasToggler);

export { OffCanvasToggler };
