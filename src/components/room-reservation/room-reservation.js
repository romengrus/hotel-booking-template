import { pluralize } from '../../utils';

function feeHtml(fee, currency) {
  const iconHtml = `<svg class="icon"><use href="#info" /></svg>`;
  const tooltipHtml = `<span class="room-reservation__fee-tooltip">${fee.desc}</span>`;
  return `
    <div class="room-reservation__fee">
      <div class="room-reservation__fee-title">${fee.title}</div>
      <div class="room-reservation__fee-desc">
        ${fee.desc ? `${iconHtml}${tooltipHtml}` : ``}
      </div>
      <div class="room-reservation__fee-amount">${fee.amount}${currency}</div>
    </div>
  `;
}

function totalFeeHtml(amount, currency) {
  return `
    <div class="room-reservation__total">
      <div class="room-reservation__total-title">Итого</div>
      <div class="room-reservation__total-underline"></div>
      <div class="room-reservation__total-amount">${amount}${currency}</div>
    </div>
  `;
}

function feesHtml(fees, days, price, currency) {
  const priceForDaysFee = {
    title: `${price}${currency} x ${days} ${pluralize(days, ['сутки', 'суток', 'суток'])}`,
    desc: '',
    amount: days * price
  };
  const priceForDaysHtml = feeHtml(priceForDaysFee, currency);

  const additionalPaymentsAmount = fees.map(v => v.amount).reduce((a, b) => a + b, 0);
  const additionalPaymentsHtml = fees.map(v => feeHtml(v, currency)).join('');

  const totalPaymentAmount = days * price + additionalPaymentsAmount;
  const totalPaymentHtml = totalFeeHtml(totalPaymentAmount, currency);

  return priceForDaysHtml + additionalPaymentsHtml + totalPaymentHtml;
}

export class RoomReservation {
  constructor(el) {
    this.cls = RoomReservation.getBaseCSSClass();
    this.el = el;
    this.arrival = el.querySelector(`${this.cls}__arrival-input`);
    this.departure = el.querySelector(`${this.cls}__departure-input`);
    this.feesEl = el.querySelector(`${this.cls}__fees`);
    this.infoIcons = el.querySelectorAll(`${this.cls}__fee-desc > .icon`);
    this.cArrival = this.arrival.__component;
    this.cDeparture = this.departure.__component;
    this.fees = JSON.parse(this.feesEl.dataset.fees);
    this.price = parseFloat(this.feesEl.dataset.price);
    this.currency = this.feesEl.dataset.currency;
    this.init();
  }

  static getBaseCSSClass() {
    return '.room-reservation';
  }

  init() {
    // restrict arrival & departure lower boun to current date
    this.cArrival.datepicker.set('minDate', new Date());
    this.cDeparture.datepicker.set('minDate', new Date());

    this._attachEventHandlers();
  }

  renderFees() {
    const arrivalDate = this.cArrival.datepicker.selectedDates[0];
    const departureDate = this.cDeparture.datepicker.selectedDates[0];

    if (arrivalDate === undefined || departureDate === undefined) {
      this.feesEl.innerHTML = '';
      this.feesEl.style.display = 'none';
      return;
    }

    const daysReserved = Math.floor((departureDate - arrivalDate) / (24 * 60 * 60 * 1000));

    this.feesEl.innerHTML = feesHtml(this.fees, daysReserved, this.price, this.currency);
    this.feesEl.style.display = 'block';
  }

  _attachEventHandlers() {
    // restrict departure min date
    this.cArrival.datepicker.config.onChange.push(dates => this._handleArrivalInputChange(dates));

    // restrict arrival max date
    this.cDeparture.datepicker.config.onChange.push(dates =>
      this._handleDepartureInputChange(dates)
    );

    // hide fees on arrival || departure input reset
    this.cArrival.datepicker.$buttonReset.addEventListener('click', () => this.renderFees());
    this.cDeparture.datepicker.$buttonReset.addEventListener('click', () => this.renderFees());
  }

  _handleArrivalInputChange(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate === undefined) return;

    const minDepartureDate = new Date(new Date(selectedDate).getTime() + 1 * 24 * 60 * 60 * 1000);
    this.cDeparture.datepicker.set('minDate', minDepartureDate);

    this.renderFees();
  }

  _handleDepartureInputChange(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate === undefined) return;

    const maxArrivalDate = new Date(new Date(selectedDate).getTime() - 1 * 24 * 60 * 60 * 1000);
    this.cArrival.datepicker.set('maxDate', maxArrivalDate);

    this.renderFees();
  }
}
