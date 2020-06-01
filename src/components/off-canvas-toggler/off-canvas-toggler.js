class OffCanvasToggler {
  constructor(el) {
    const id = OffCanvasToggler.getID();
    this.el = el;
    this.connectedWithEl = document.getElementById(el.dataset.connectedWith);
    this.inputEl = el.querySelector(`[data-${id}-input]`);
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
    this.handleClick = this.handleClick.bind(this);
  }

  attachEventHandlers() {
    this.inputEl.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.connectedWithEl.dispatchEvent(new Event('off-canvas:toggle'));
  }
}

export { OffCanvasToggler };
