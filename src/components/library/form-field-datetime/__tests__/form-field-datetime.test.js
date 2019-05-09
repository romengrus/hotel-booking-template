import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { FormFieldDatetime } from '../form-field-datetime';

const qs = FormFieldDatetime.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'form-field-datetime.test.pug');
const makeField = pug.compileFile(templatePath, { basedir });

describe('FormFieldDatetime', () => {
  test('static getQuerySelector() should return component css selector', () => {
    expect(FormFieldDatetime.getQuerySelector()).toBe('.form-field-datetime');
  });

  test('should render', () => {
    document.body.innerHTML = makeField();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should use date mask by default', () => {
    document.body.innerHTML = makeField();
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.mask).not.toBeNull();
    expect(field.datepicker).toBeNull();
  });

  test('should use datepicker if useDatepicker = true', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.mask).toBeNull();
    expect(field.datepicker).not.toBeNull();
  });

  test('datepicker should use alternative input to display date', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.datepicker.config.altInput).toBe(true);
  });

  test('should not have icon by default', () => {
    document.body.innerHTML = makeField();
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.form-field-datetime__icon-toggle');
    expect($icon).not.toBeInTheDocument();
  });

  test('should have icon if useDatepicker = true', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.form-field-datetime__icon-toggle');
    expect($icon).toBeInTheDocument();
  });

  test('datepicker visibility should be toggled by clicking on icon', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.form-field-datetime__icon-toggle');
    const field = new FormFieldDatetime($el);
    expect(field.datepicker.isOpen).toBe(false);
    fireEvent.click($icon);
    expect(field.datepicker.isOpen).toBe(true);
    fireEvent.click($icon);
    expect(field.datepicker.isOpen).toBe(false);
  });

  test('datepicker should show up on input focus', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.datepicker.isOpen).toBe(false);
    fireEvent.focus(field.datepicker.altInput);
    expect(field.datepicker.isOpen).toBe(true);
  });

  test('datepicker should be in "single" select mode by default', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.datepicker).not.toBeNull();
    expect(field.datepicker.config.mode).toBe('single');
  });

  test('datepicker should be in "range" select mode if datepickerMode = "range"', () => {
    document.body.innerHTML = makeField({
      props: { useDatepicker: true, datepickerMode: 'range' }
    });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.datepicker.config.mode).toBe('range');
  });

  test('datepicker should be in "multiple" select mode if datepickerMode = "multiple"', () => {
    document.body.innerHTML = makeField({
      props: { useDatepicker: true, datepickerMode: 'multiple' }
    });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    expect(field.datepicker.config.mode).toBe('multiple');
  });

  test('mask should use provided dateFormat', () => {
    document.body.innerHTML = makeField({ props: { dateFormat: 'm.Y' } });
    const $el1 = document.querySelector(qs);
    const field1 = new FormFieldDatetime($el1);
    expect(field1.mask.mask).toBe('m.Y');

    document.body.innerHTML = makeField({ props: { dateFormat: 'Y' } });
    const $el2 = document.querySelector(qs);
    const field2 = new FormFieldDatetime($el2);
    expect(field2.mask.mask).toBe('Y');
  });

  test('datepicker should use provided dateFormat', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true, dateFormat: 'm.Y' } });
    const $el1 = document.querySelector(qs);
    const field1 = new FormFieldDatetime($el1);
    expect(field1.datepicker.config.altFormat).toBe('m.Y');
  });

  test('datepicker state should reset on "reset" button click', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    field.datepicker.setDate(new Date());
    expect(field.datepicker.selectedDates).toHaveLength(1);
    fireEvent.click(field.datepicker.$buttonReset);
    expect(field.datepicker.selectedDates).toHaveLength(0);
  });

  test('datepicker should be closed on "ok" button click', () => {
    document.body.innerHTML = makeField({ props: { useDatepicker: true } });
    const $el = document.querySelector(qs);
    const field = new FormFieldDatetime($el);
    field.datepicker.setDate(new Date());
    expect(field.datepicker.isOpen).toBe(false);
    field.datepicker.open();
    expect(field.datepicker.isOpen).toBe(true);
    fireEvent.click(field.datepicker.$buttonOk);
    expect(field.datepicker.isOpen).toBe(false);
  });
});
