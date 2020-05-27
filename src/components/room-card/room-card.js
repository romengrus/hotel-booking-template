class RoomCard {
  constructor(el) {
    this.el = el;
    this.cls = RoomCard.getBaseCSSClass();

    this.init();
  }

  static getBaseCSSClass() {
    return '.room-card';
  }

  init() {
    this._formatRoomPrice();
  }

  _formatRoomPrice() {
    const priceSelector = `${this.cls}__price`;
    const priceEl = this.el.querySelector(priceSelector);
    const price = priceEl.textContent;

    priceEl.textContent = parseFloat(price).toLocaleString('ru');
  }
}

export { RoomCard };
