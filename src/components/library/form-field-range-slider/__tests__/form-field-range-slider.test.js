/* eslint-disable no-unused-vars */
import path from 'path';
import pug from 'pug';
import { FormFieldRangeSlider } from '../form-field-range-slider';

const qs = FormFieldRangeSlider.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'form-field-range-slider.test.pug');
const makeSlider = pug.compileFile(templatePath, { basedir });

describe('Range Slider', () => {
  test('should render', () => {
    document.body.innerHTML = makeSlider();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply modifier classess', () => {
    document.body.innerHTML = makeSlider({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should apply attributes', () => {
    document.body.innerHTML = makeSlider({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field-range-slider__input');
    expect($input).toHaveAttribute('foo', 'bar');
  });

  test('should apply parameters to slider', () => {
    const params = { start: 50, range: { min: 0, max: 100 } };
    document.body.innerHTML = makeSlider({ props: { params } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field-range-slider__input');
    const component = new FormFieldRangeSlider($el);
    expect($input).toHaveAttribute('data-params');
    expect(component.params).toEqual(params);
  });

  test('should include hidden input for stroring result value', () => {
    const params = { start: 50, range: { min: 0, max: 100 } };
    document.body.innerHTML = makeSlider({ props: { params } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.form-field-range-slider__input');
    const component = new FormFieldRangeSlider($el);
    expect($input).toBeInTheDocument();
    expect($input).not.toBeVisible();
    expect(component.$input).not.toBe(undefined);
  });

  test('should show label if label is provided in props', () => {
    const label = 'test label';
    document.body.innerHTML = makeSlider({ props: { label } });
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.form-field-range-slider__label');
    expect($label).toBeInTheDocument();
    expect($label.innerHTML).toBe(label);
  });

  test('should show description if desc is provided in props', () => {
    const desc = 'test desc';
    document.body.innerHTML = makeSlider({ props: { desc } });
    const $el = document.querySelector(qs);
    const $desc = $el.querySelector('.form-field-range-slider__desc');
    expect($desc).toBeInTheDocument();
    expect($desc.innerHTML).toBe(desc);
  });

  test('should show selected range value by default', () => {
    const params = { start: 50, range: { min: 0, max: 100 } };
    document.body.innerHTML = makeSlider({ props: { params } });
    const $el = document.querySelector(qs);
    const $display = $el.querySelector('.form-field-range-slider__display');
    const component = new FormFieldRangeSlider($el);
    expect($display).toBeInTheDocument();
    expect(component.$display).not.toBe(undefined);
    expect(component.showValue).toBe(true);
    expect($display.innerText).toBe('50.00');
  });
});
