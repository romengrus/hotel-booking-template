export class Button {
  constructor($el) {
    this.$el = $el;
    this.init();
  }

  static getQuerySelector() {
    return '.button';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.$el.addEventListener('click', e => this._handleButtonClick(e));
  }

  _handleButtonClick(e) {
    if (this.$el.classList.contains('button_has-ripple')) {
      this._showRipple(e);
    }
  }

  _showRipple(e) {
    const $rippleEl = document.createElement('div');
    const rect = this.$el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move ripple block center to mouse click coords
    $rippleEl.style.top = `${y}px`;
    $rippleEl.style.left = `${x}px`;

    this.$el.appendChild($rippleEl);
    $rippleEl.classList.add('button_ripple-effect');

    window.setTimeout(() => {
      this.$el.removeChild($rippleEl);
    }, 1000);
  }
}
