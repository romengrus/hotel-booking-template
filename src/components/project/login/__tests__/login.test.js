import path from 'path';
import pug from 'pug';

const qs = '.login';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'login.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Login', () => {
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
    const $form = $el.querySelector('.login__form');
    expect($form).toBeInTheDocument();
  });

  test('should apply provided attributes to form', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.login__form');
    expect($form).toHaveAttribute('foo', 'bar');
  });

  test('should have title', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $title = $el.querySelector('.login__title');
    expect($title).toBeInTheDocument();
  });

  test('should have input for email', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.login__email');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('email');
  });

  test('should have input for password', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.login__password');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('password');
  });

  test('should have submit button', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $submit = $el.querySelector('.login__submit');
    expect($submit).toBeInTheDocument();
  });

  test('should have create account button', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $login = $el.querySelector('.login__register');
    expect($login).toBeInTheDocument();
  });
});
