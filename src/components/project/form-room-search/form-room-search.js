export class FormRoomSearch {
  constructor($el) {
    this.$el = $el;
    this.$arrival = $el.querySelector('.form-room-search__arrival-input');
    this.$departure = $el.querySelector('.form-room-search__departure-input');
    this.cArrival = this.$arrival.__component;
    this.cDeparture = this.$departure.__component;
    this.init();
  }

  static getQuerySelector() {
    return '.form-room-search';
  }

  init() {
    // restrict arrival & departure lower boun to current date
    this.cArrival.datepicker.set('minDate', new Date());
    this.cDeparture.datepicker.set('minDate', new Date());

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    // restrict departure date lower bound to arrival date
    this.cArrival.datepicker.config.onChange.push(selectedDates => {
      const date = selectedDates[0];
      this.cDeparture.datepicker.set('minDate', date);
    });

    // restrict arrival date upper bound to departure date
    this.cDeparture.datepicker.config.onChange.push(selectedDates => {
      const date = selectedDates[0];
      this.cArrival.datepicker.set('maxDate', date);
    });
  }
}
