export class RoomSearch {
  constructor(el) {
    this.cls = RoomSearch.getBaseCSSClass();
    this.el = el;
    this.arrival = el.querySelector(`${this.cls}__arrival-input`);
    this.departure = el.querySelector(`${this.cls}__departure-input`);
    this.cArrival = this.arrival.__component;
    this.cDeparture = this.departure.__component;
    this.init();
  }

  static getBaseCSSClass() {
    return '.room-search';
  }

  init() {
    // restrict arrival & departure lower bound to current date
    this.cArrival.datepicker.set('minDate', new Date());
    this.cDeparture.datepicker.set('minDate', new Date());

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    // restrict departure min date
    this.cArrival.datepicker.config.onChange.push(dates => this._handleArrivalInputChange(dates));

    // restrict arrival max date
    this.cDeparture.datepicker.config.onChange.push(dates =>
      this._handleDepartureInputChange(dates)
    );
  }

  _handleArrivalInputChange(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate === undefined) return;

    const minDepartureDate = new Date(new Date(selectedDate).getTime() + 1 * 24 * 60 * 60 * 1000);
    this.cDeparture.datepicker.set('minDate', minDepartureDate);
  }

  _handleDepartureInputChange(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate === undefined) return;

    const maxArrivalDate = new Date(new Date(selectedDate).getTime() - 1 * 24 * 60 * 60 * 1000);
    this.cArrival.datepicker.set('maxDate', maxArrivalDate);
  }
}
