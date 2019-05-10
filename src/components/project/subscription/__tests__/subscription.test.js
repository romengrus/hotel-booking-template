import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { Subscription } from '../subscription';

const qs = '.subscription';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'subscription.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Subscription', () => {
  test('should render component', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should contain form element', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.form');
    expect($form).toBeInTheDocument();
    expect($form).toHaveClass('subscription__form');
  });

  test('form should have method & action attributes setup correctly', () => {
    const url = '/subscribe';
    document.body.innerHTML = makeComponent({ props: { url } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.form');
    expect($form).toHaveAttribute('method', 'POST');
    expect($form).toHaveAttribute('action', url);
  });

  test('form should contain input for email address', () => {
    const placeholder = 'test placeholder';
    document.body.innerHTML = makeComponent({ props: { placeholder } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.form');
    const $input = $form.querySelector('.form-field');
    expect($input).toBeInTheDocument();
    expect($input).toHaveAttribute('type', 'email');
    expect($input).toHaveAttribute('required');
    expect($input).toHaveAttribute('placeholder', placeholder);
    expect($input).toHaveClass('subscription__input');
  });

  test('form should contain icon', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.form');
    const $icon = $form.querySelector('.icon');
    expect($icon).toBeInTheDocument();
    expect($icon).toHaveClass('subscription__icon');
  });

  test('input & icon should contain appropriate classes for icon position', () => {
    // icon on the right side
    document.body.innerHTML = makeComponent();
    let $el = document.querySelector(qs);
    let $form = $el.querySelector('.form');
    let $input = $form.querySelector('.form-field');
    let $icon = $form.querySelector('.icon');
    expect($input).toHaveClass('subscription__input_icon_right');
    expect($icon).toHaveClass('subscription__icon_right');

    // icon on the left side
    document.body.innerHTML = makeComponent({ props: { iconPosition: 'left' } });
    $el = document.querySelector(qs);
    $form = $el.querySelector('.form');
    $input = $form.querySelector('.form-field');
    $icon = $form.querySelector('.icon');
    expect($input).toHaveClass('subscription__input_icon_left');
    expect($icon).toHaveClass('subscription__icon_left');
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should submit form on icon click', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.icon');
    const subscription = new Subscription($el);
    const submitMock = jest.fn();
    subscription.$form.submit = submitMock;
    fireEvent.click($icon);
    expect(submitMock).toHaveBeenCalled();
  });
});
