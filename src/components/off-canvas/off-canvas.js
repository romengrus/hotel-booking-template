class OffCanvas {
  constructor(el) {
    this.el = el;
    this.mainContainer = document.body;
    this.init();
  }

  static getID() {
    return 'off-canvas';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();

    this.mainContainer.classList.add('off-canvas__container');
  }

  bindEventHandlers() {
    this.handleToggle = this.handleToggle.bind(this);
  }

  attachEventHandlers() {
    this.el.addEventListener('off-canvas:toggle', this.handleToggle);
  }

  handleToggle() {
    this.mainContainer.classList.toggle('off-canvas_is-opened');
  }
}

export { OffCanvas };
