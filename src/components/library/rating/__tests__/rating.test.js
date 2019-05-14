import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { Rating } from '../rating';

const qs = Rating.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'rating.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Rating', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided modifier classes', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('rating', 'modifier1', 'modifier2');
  });

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'foo', bar: 'bar' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('foo', 'foo');
    expect($el).toHaveAttribute('bar', 'bar');
  });

  test('should render 5 icons by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $icons = $el.querySelectorAll('.rating__icon');
    expect($icons.length).toBe(5);
  });

  test('should render provided number of icons', () => {
    document.body.innerHTML = makeComponent({ props: { numIcons: 10 } });
    const $el = document.querySelector(qs);
    const $icons = $el.querySelectorAll('.rating__icon');
    expect($icons.length).toBe(10);
  });

  test('should use "star" icon in place of iconEmpty by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.iconEmpty).toBe('star');
  });

  test('should use "star-active" icon in place of iconFilled by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.iconFilled).toBe('star-active');
  });

  test('should use "star-half-active" icon in place of iconHalfFilled by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.iconHalfFilled).toBe('star-half-active');
  });

  test('should not use partial rating by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.isPartial).toBe(false);
  });

  test('should use partial rating if isPartial = true', () => {
    document.body.innerHTML = makeComponent({ props: { isPartial: true } });
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.isPartial).toBe(true);
  });

  test('default value should be 0', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.value).toBe(0);
  });

  test('should use provided value', () => {
    const value = 4.34;
    document.body.innerHTML = makeComponent({ props: { value } });
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.value).toBe(value);
  });

  test('should use empty string for objectId by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.objectId).toBe('');
  });

  test('should use provided value for objectId', () => {
    const objectId = 'article-123';
    document.body.innerHTML = makeComponent({ props: { objectId } });
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.objectId).toBe(objectId);
  });

  test('should round value according to isPartial flag', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const component = new Rating($el);
    expect(component.roundToNearestHalf(2.1)).toBe(2);
    expect(component.roundToNearestHalf(2.2)).toBe(2);
    expect(component.roundToNearestHalf(2.25)).toBe(2);
    expect(component.roundToNearestHalf(2.3)).toBe(2);
    expect(component.roundToNearestHalf(2.35)).toBe(2);
    expect(component.roundToNearestHalf(2.5)).toBe(3);
    expect(component.roundToNearestHalf(2.6)).toBe(3);
    expect(component.roundToNearestHalf(2.65)).toBe(3);
    expect(component.roundToNearestHalf(2.8)).toBe(3);
    component.isPartial = true;
    expect(component.roundToNearestHalf(2.1)).toBe(2);
    expect(component.roundToNearestHalf(2.2)).toBe(2);
    expect(component.roundToNearestHalf(2.25)).toBe(2.5);
    expect(component.roundToNearestHalf(2.3)).toBe(2.5);
    expect(component.roundToNearestHalf(2.35)).toBe(2.5);
    expect(component.roundToNearestHalf(2.5)).toBe(2.5);
    expect(component.roundToNearestHalf(2.6)).toBe(2.5);
    expect(component.roundToNearestHalf(2.65)).toBe(2.5);
    expect(component.roundToNearestHalf(2.8)).toBe(3);
  });

  test('should dispatch event on click with rating value & object id', () => {
    const objectId = 'article-123';
    document.body.innerHTML = makeComponent({ props: { objectId } });
    const $el = document.querySelector(qs);
    const listenerMock = jest.fn();
    $el.addEventListener('rating:voted', e => listenerMock(e));
    // eslint-disable-next-line no-unused-vars
    const component = new Rating($el);
    fireEvent.click($el);
    expect(listenerMock).toBeCalled();
    // eslint-disable-next-line prefer-destructuring
    const detail = listenerMock.mock.calls[0][0].detail;
    expect(detail.value).not.toBe(undefined);
    expect(detail.objectId).toBe(objectId);
  });
});
