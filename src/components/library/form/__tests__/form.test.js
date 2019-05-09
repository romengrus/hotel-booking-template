import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { Form } from '../form';

const qs = Form.getQuerySelector();
// const fieldWarningClass = 'form-field__warning-msg'
// const fieldValidClass = 'form-field_valid'
const fieldInvalidClass = 'form-field_invalid';
const fieldValidatedClass = 'form-field_validated';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'form.test.pug');
const makeForm = pug.compileFile(templatePath, { basedir });

describe('Form', () => {
  test('static getQuerySelector() should return component css selector', () => {
    expect(Form.getQuerySelector()).toBe('.form');
  });

  test('should apply modifier classes from props.mods', () => {
    document.body.innerHTML = makeForm({ props: { mods: ['modifier1', 'modifier2'] } });
    const $form = document.querySelector(qs);
    expect($form).toHaveClass('form', 'modifier1', 'modifier2');
  });

  test('should validate required field on blur', () => {
    document.body.innerHTML = makeForm();
    const $form = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const form = new Form($form);
    const $field = $form.querySelector('#text-required');
    expect($field).toHaveAttribute('required');
    fireEvent.blur($field);
    expect($field).toHaveClass(fieldValidatedClass, fieldInvalidClass);
    expect($field).toHaveAttribute('aria-invalid', 'true');
  });

  test('should validate required field on form submit', () => {
    document.body.innerHTML = makeForm();
    const $form = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const form = new Form($form);
    const $field = $form.querySelector('#text-required');
    const $submit = $form.querySelector('#submit');
    expect($field).toHaveAttribute('required');
    fireEvent.click($submit);
    expect($field).toHaveClass(fieldValidatedClass, fieldInvalidClass);
    expect($field).toHaveAttribute('aria-invalid', 'true');
    expect($field).toHaveAttribute('aria-errormessage');
    expect($field).toHaveAttribute('aria-describedby');
    const errorMsgId = $field.getAttribute('aria-describedby');
    const $errorMsg = $form.querySelector(`#${errorMsgId}`);
    expect($errorMsg).toHaveClass('form-field__warning-msg');
    expect($errorMsg).toHaveTextContent('Пожалуйста, заполните это поле.');
  });
});
