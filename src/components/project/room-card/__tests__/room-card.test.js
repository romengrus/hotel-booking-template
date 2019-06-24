import path from 'path';
import pug from 'pug';
import { pluralize } from '../../../../l10n/utils';

const qs = '.room-card';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'room-card.test.pug');
const _makeComponent = pug.compileFile(templatePath, { basedir });
const makeComponent = args => _makeComponent({ ...args, pluralize });

describe('Room Card', () => {
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

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('foo', 'bar');
  });

  test('should show slider if 1 image is provided', () => {
    const images = ['test-image.jpg'];
    document.body.innerHTML = makeComponent({ props: { images } });
    const $el = document.querySelector(qs);
    const $slider = $el.querySelector('.room-card__slider');
    expect($slider).toBeInTheDocument();
  });

  test('should show room number', () => {
    const roomNumber = '888a';
    document.body.innerHTML = makeComponent({ props: { roomNumber } });
    const $el = document.querySelector(qs);
    const $roomNumber = $el.querySelector('.room-card__number');
    expect($roomNumber).toBeInTheDocument();
    expect($roomNumber.textContent).toBe(`№ ${roomNumber}`);
  });

  test('should show room price if provided', () => {
    document.body.innerHTML = makeComponent({ props: { price: '1000' } });
    const $el = document.querySelector(qs);
    const $roomPrice = $el.querySelector('.room-card__price');
    expect($roomPrice).toBeInTheDocument();
    expect($roomPrice.textContent).toBe('1000');
  });

  test('should not show room price if not provided', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $roomPrice = $el.querySelector('.room-card__price');
    expect($roomPrice).not.toBeInTheDocument();
  });

  test('should show star rating', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $rating = $el.querySelector('.room-card__rating');
    expect($rating).toBeInTheDocument();
  });

  test('should show number of room reviews if provided', () => {
    document.body.innerHTML = makeComponent({ props: { numReviews: 100 } });
    const $el = document.querySelector(qs);
    const $numReviews = $el.querySelector('.room-card__reviews-amount');
    expect($numReviews).toBeInTheDocument();
    expect($numReviews.textContent).toBe('100');
  });

  test('should not show number of room reviews if not provided', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $numReviews = $el.querySelector('.room-card__reviews');
    expect($numReviews).not.toBeInTheDocument();
  });

  test('should lux indicator if isLux is true in props', () => {
    document.body.innerHTML = makeComponent({ props: { isLux: true } });
    const $el = document.querySelector(qs);
    const $luxIndicator = $el.querySelector('.room-card__lux-indicator');
    expect($el).toHaveClass('room-card_is-lux');
    expect($luxIndicator).toBeInTheDocument();
  });
});
