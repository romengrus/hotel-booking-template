import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { Counter } from '../counter';

const qs = Counter.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'counter.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Counter', () => {
  test('should render component', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should have input field', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field');
    expect($input).toBeInTheDocument();
    expect($input).toHaveAttribute('type', 'number');
    expect($input).toHaveClass('counter__input');
  });

  test('should have 0 value by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field');
    const $display = $el.querySelector('.counter__display');
    expect($input.value).toBe('0');
    expect($display).toHaveTextContent('0');
  });

  test('should use provided value', () => {
    document.body.innerHTML = makeComponent({ props: { value: 5 } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field');
    expect($input.value).toBe('5');
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should have data-step attribute set to 1 by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-step', '1');
  });

  test('should set data-step to povided value', () => {
    document.body.innerHTML = makeComponent({ props: { step: 5 } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-step', '5');
  });

  test('should have data-min attribute set to 0 by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-min', '0');
  });

  test('should set data-min to povided value', () => {
    document.body.innerHTML = makeComponent({ props: { min: -1 } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-min', '-1');
  });

  test('should have data-max attribute set to 100 by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-max', '100');
  });

  test('should set data-max to povided value', () => {
    document.body.innerHTML = makeComponent({ props: { max: 1000 } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('data-max', '1000');
  });

  test('should render label without text by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.counter__label');
    expect($label).toBeInTheDocument();
  });

  test('should render label with provided text', () => {
    const label = 'test label';
    document.body.innerHTML = makeComponent({ props: { label } });
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.counter__label');
    expect($label).toHaveTextContent(label);
  });

  test('should proxy all provided attributes to input element', () => {
    document.body.innerHTML = makeComponent({
      attributes: { hidden: true, name: 'test-name', id: 'test-id' }
    });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.counter__input');
    expect($input).toHaveAttribute('hidden');
    expect($input).toHaveAttribute('name', 'test-name');
    expect($input).toHaveAttribute('id', 'test-id');
  });

  test('should have block with control buttons', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $controls = $el.querySelector('.counter__controls');
    expect($controls).toBeInTheDocument();
  });

  test('should have increase & decrease buttons', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $controls = $el.querySelector('.counter__controls');
    const $buttonInc = $controls.querySelector('.counter__button-inc');
    const $buttonDec = $controls.querySelector('.counter__button-dec');
    expect($buttonInc).toBeInTheDocument();
    expect($buttonDec).toBeInTheDocument();
  });

  test('decrease button should be disabled if value equals min value', () => {
    document.body.innerHTML = makeComponent({ props: { value: -9, min: -10 } });
    const $el = document.querySelector(qs);
    const $controls = $el.querySelector('.counter__controls');
    const $buttonDec = $controls.querySelector('.counter__button-dec');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    expect($buttonDec).not.toBeDisabled();
    fireEvent.click($buttonDec);
    expect($buttonDec).toBeDisabled();
  });

  test('increase button should be disabled if value equals max value', () => {
    document.body.innerHTML = makeComponent({ props: { value: 9, max: 10 } });
    const $el = document.querySelector(qs);
    const $controls = $el.querySelector('.counter__controls');
    const $buttonInc = $controls.querySelector('.counter__button-inc');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    expect($buttonInc).not.toBeDisabled();
    fireEvent.click($buttonInc);
    expect($buttonInc).toBeDisabled();
  });

  test('should increase value by step value on inc-button click', () => {
    document.body.innerHTML = makeComponent({ props: { value: 0, step: 5 } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.counter__input');
    const $display = $el.querySelector('.counter__display');
    const $buttonInc = $el.querySelector('.counter__button-inc');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    fireEvent.click($buttonInc);
    expect($display).toHaveTextContent('5');
    expect($input.value).toBe('5');
    fireEvent.click($buttonInc);
    expect($display).toHaveTextContent('10');
    expect($input.value).toBe('10');
  });

  test('should fire "counter:increased" event with current counter value on inc-button click', () => {
    document.body.innerHTML = makeComponent({ props: { value: 0, step: 5 } });
    const $el = document.querySelector(qs);
    const $buttonInc = $el.querySelector('.counter__button-inc');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    const listenerMock = jest.fn();
    $el.addEventListener('counter:increased', e => listenerMock(e));
    fireEvent.click($buttonInc);
    expect(listenerMock).toHaveBeenCalled();
    const eventValue = listenerMock.mock.calls[0][0].detail;
    expect(eventValue).toBe(5);
  });

  test('should decrease value by step value on dec-button click', () => {
    document.body.innerHTML = makeComponent({ props: { value: 2 } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.counter__input');
    const $display = $el.querySelector('.counter__display');
    const $buttonDec = $el.querySelector('.counter__button-dec');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    fireEvent.click($buttonDec);
    expect($display).toHaveTextContent('1');
    expect($input.value).toBe('1');
    fireEvent.click($buttonDec);
    expect($display).toHaveTextContent('0');
    expect($input.value).toBe('0');
  });

  test('should fire "counter:decreased" event with current counter value on dec-button click', () => {
    document.body.innerHTML = makeComponent({ props: { value: 2 } });
    const $el = document.querySelector(qs);
    const $buttonDec = $el.querySelector('.counter__button-dec');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    const listenerMock = jest.fn();
    $el.addEventListener('counter:decreased', e => listenerMock(e));
    fireEvent.click($buttonDec);
    expect(listenerMock).toHaveBeenCalled();
    const eventValue = listenerMock.mock.calls[0][0].detail;
    expect(eventValue).toBe(1);
  });

  test('if decrease button is disabled - clicking on increase button should enable it', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $controls = $el.querySelector('.counter__controls');
    const $buttonInc = $controls.querySelector('.counter__button-inc');
    const $buttonDec = $controls.querySelector('.counter__button-dec');
    // eslint-disable-next-line no-unused-vars
    const component = new Counter($el);
    expect($buttonDec).toBeDisabled();
    fireEvent.click($buttonInc);
    expect($buttonDec).not.toBeDisabled();
  });
});
