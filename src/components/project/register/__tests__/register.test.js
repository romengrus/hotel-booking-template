import path from 'path';
import pug from 'pug';

const qs = '.register';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'register.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Register', () => {
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
    const $form = $el.querySelector('.register__form');
    expect($form).toBeInTheDocument();
  });

  test('should apply provided attributes to form', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.register__form');
    expect($form).toHaveAttribute('foo', 'bar');
  });

  test('should have title', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $title = $el.querySelector('.register__title');
    expect($title).toBeInTheDocument();
  });

  test('should have input for name', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__name-input');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('text');
  });

  test('should have input for surname', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__surname-input');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('text');
  });

  test('should have radio buttons for gender', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $radioBtnMan = $el.querySelector('.register__is-man');
    const $radioBtnWoman = $el.querySelector('.register__is-woman');
    expect($radioBtnMan).toBeInTheDocument();
    expect($radioBtnWoman).toBeInTheDocument();
  });

  test('should have input for birth date', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__birthdate');
    expect($input).toBeInTheDocument();
  });

  test('should have input for email', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__email');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('email');
  });

  test('should have input for password', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__password');
    expect($input).toBeInTheDocument();
    expect($input.tagName).toBe('INPUT');
    expect($input.type).toBe('password');
  });

  test('should have checkbox to receive newsletter', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.register__newsletter');
    expect($input).toBeInTheDocument();
  });

  test('should have submit button', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $submit = $el.querySelector('.register__submit');
    expect($submit).toBeInTheDocument();
  });

  test('should have login button', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $login = $el.querySelector('.register__login');
    expect($login).toBeInTheDocument();
  });
});
