import { factory } from '../../scripts/factory';

class OffCanvas {
  constructor(el) {
    this.el = el;
    this.mainContainer = el.parentElement;
    this.init();
  }

  static getID() {
    return 'off-canvas';
  }

  init() {
    this.attachEventHandlers();

    this.mainContainer.classList.add('off-canvas__container');
  }

  attachEventHandlers() {
    this.el.addEventListener('off-canvas:toggle', this.handleToggle);
  }

  handleToggle = () => {
    this.mainContainer.classList.toggle('off-canvas__parent');
    this.el.classList.toggle('off-canvas_is-opened');
  };
}

factory(OffCanvas);

export { OffCanvas };
