import flatpickr from 'flatpickr';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';

class FormRoomSearch {
  constructor(el) {
    this.id = FormRoomSearch.getID();
    this.el = el;
    this.init();
  }

  static getID() {
    return 'room-search';
  }

  init() {
    const arrival = this.el.querySelector(`[data-${this.id}-arrival] [data-datepicker]`);
    const departure = this.el.querySelector(`[data-${this.id}-departure] [data-datepicker]`);

    flatpickr(arrival, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: new Date(),
      mode: 'range',
      plugins: [new RangePlugin({ input: departure, position: 'left' })]
    });
  }
}

export { FormRoomSearch };
