import { factory } from '../../scripts/factory';

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
    this.formatRoomPrice();
  }

  formatRoomPrice() {
    const priceEl = this.el.querySelector(`[data-${this.id}-price]`);
    const price = priceEl.textContent;

    priceEl.innerHTML = parseFloat(price)
      .toLocaleString('ru')
      .split(/\s/)
      .map(p => `<span class="room-card__price-part">${p}</span>`)
      .join('');
  }
}

factory(RoomCard);

export { RoomCard };
