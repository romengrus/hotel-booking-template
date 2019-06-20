/* eslint-disable no-unused-vars */
import path from 'path';
import pug from 'pug';
import { RoomReservation } from '../room-reservation';
import { FormFieldDatetime } from '../../../library/form-field-datetime/form-field-datetime';

const qs = RoomReservation.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'room-reservation.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Room Reservation', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided modifiers', () => {
    const mods = ['modifier1', 'modifier2'];
    document.body.innerHTML = makeComponent({ props: { mods } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass(...mods);
  });

  test('should contain form', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.room-reservation__form');
    expect($form).toBeInTheDocument();
  });

  test('should apply provided attributes to form', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.room-reservation__form');
    expect($form).toHaveAttribute('foo', 'bar');
  });

  test('should display provided room number', () => {
    const roomNumber = '444a';
    document.body.innerHTML = makeComponent({ props: { roomNumber } });
    const $el = document.querySelector(qs);
    const $roomNumber = $el.querySelector('.room-reservation__room-number');
    expect($roomNumber).toBeInTheDocument();
    expect($roomNumber.textContent).toBe(roomNumber);
  });

  test('should add modifier class & display lux indicator if isLux is true', () => {
    document.body.innerHTML = makeComponent({ props: { isLux: true } });
    const $el = document.querySelector(qs);
    const $luxIndicator = $el.querySelector('.room-reservation__lux-indicator');
    expect($el).toHaveClass('room-reservation_is-lux');
    expect($luxIndicator).toBeInTheDocument();
  });

  test('should display price if provided in props', () => {
    document.body.innerHTML = makeComponent({ props: { price: 1000 } });
    const $el = document.querySelector(qs);
    const $price = $el.querySelector('.room-reservation__price');
    expect($price).toBeInTheDocument();
  });

  test('should display russian currency symbol in price by default', () => {
    document.body.innerHTML = makeComponent({ props: { price: 1000 } });
    const expectedCurrency = expect.stringContaining('₽');
    const $el = document.querySelector(qs);
    const $price = $el.querySelector('.room-reservation__currency');
    expect($price.textContent).toEqual(expectedCurrency);
  });

  test('should contain arrival date input', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $arrival = $el.querySelector('.room-reservation__arrival');
    expect($arrival).toBeInTheDocument();
  });

  test('should contain departure date input', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $departure = $el.querySelector('.room-reservation__departure');
    expect($departure).toBeInTheDocument();
  });

  test('should contain guests input', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $guests = $el.querySelector('.room-reservation__guests');
    expect($guests).toBeInTheDocument();
  });

  test('should have container for fees', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $feesContainer = $el.querySelector('.room-reservation__fees');
    expect($feesContainer).toBeInTheDocument();
    expect($feesContainer).not.toBeVisible();
  });

  test('should contain submit button', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $submit = $el.querySelector('.room-reservation__submit');
    expect($submit).toBeInTheDocument();
  });

  test('should display fees only when arrival & departure dates are selected', () => {
    // initial state
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $fees = $el.querySelector('.room-reservation__fees');
    const $arrival = $el.querySelector('.room-reservation__arrival-input');
    const $departure = $el.querySelector('.room-reservation__departure-input');
    const dtArival = new FormFieldDatetime($arrival);
    const dtDeparture = new FormFieldDatetime($departure);
    const roomReservation = new RoomReservation($el);
    const cArrival = $arrival.__component;
    const cDeparture = $departure.__component;
    expect($fees).not.toBeVisible();

    // arrival is selected
    cArrival.datepicker.setDate(new Date(), true);
    expect($fees).not.toBeVisible();

    // departure is selected (arrival + 4 days)
    cDeparture.datepicker.setDate(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), true);
    expect($fees).toBeVisible();
  });
});
