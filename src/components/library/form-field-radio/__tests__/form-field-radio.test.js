import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { FormFieldRadio } from '../form-field-radio';

const qs = '.radio';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'form-field-radio.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Radio', () => {
  test('should render component', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('all attributes should be proxied to input element', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: '123', bar: '321' } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.radio__input');
    expect($input).toHaveAttribute('foo', '123');
    expect($input).toHaveAttribute('bar', '321');
  });

  test('should render provided label', () => {
    const testLabel = 'test label';
    document.body.innerHTML = makeComponent({ props: { label: testLabel } });
    const $el = document.querySelector(qs);
    const $label = $el.querySelector('.radio__label');
    expect($label).toBeInTheDocument();
    expect($label).toHaveTextContent(testLabel);
  });

  test('should render provided description', () => {
    const testDesc = 'test desc';
    document.body.innerHTML = makeComponent({ props: { desc: testDesc } });
    const $el = document.querySelector(qs);
    const $desc = $el.querySelector('.radio__desc');
    expect($desc).toBeInTheDocument();
    expect($desc).toHaveTextContent(testDesc);
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({
      props: { mods: ['modifier1', 'modifier2'] }
    });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('radio', 'modifier1', 'modifier2');
  });

  test('should enable radio when clicking on custom input element', () => {
    document.body.innerHTML = makeComponent({ props: { label: 'test label' } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.radio__input');
    const $customInput = $el.querySelector('.radio__custom');
    // eslint-disable-next-line no-unused-vars
    const radio = new FormFieldRadio($el);
    expect($input.checked).toBe(false);
    fireEvent.click($customInput);
    expect($input.checked).toBe(true);
  });
});
