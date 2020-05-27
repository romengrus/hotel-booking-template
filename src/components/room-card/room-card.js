class RoomCard {
  constructor(el) {
    this.el = el;
    this.id = RoomCard.getID();

    this.init();
  }

  static getID() {
    return 'room-card';
  }

  init() {
    this._formatRoomPrice();
  }

  _formatRoomPrice() {
    const priceEl = this.el.querySelector(`[data-${this.id}-price]`);
    const price = priceEl.textContent;

    priceEl.textContent = parseFloat(price).toLocaleString('ru');
  }
}

export { RoomCard };
