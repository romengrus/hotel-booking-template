import flatpickr from 'flatpickr';
import RangePlugin from 'flatpickr/dist/plugins/rangePlugin';

class RoomSearch {
  constructor(el) {
    this.cls = RoomSearch.getBaseCSSClass();
    this.el = el;
    this.init();
  }

  static getBaseCSSClass() {
    return '.room-search';
  }

  init() {
    const arrival = this.el.querySelector(`${this.cls}__arrival [data-datepicker]`);
    const departure = this.el.querySelector(`${this.cls}__departure [data-datepicker]`);

    arrival._flatpickr.destroy();
    departure._flatpickr.destroy();

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

export { RoomSearch };
