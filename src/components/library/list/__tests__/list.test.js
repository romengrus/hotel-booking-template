import path from 'path';
import pug from 'pug';

const qs = '.list';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'list.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('List', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should show undordered list by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el.tagName).toBe('UL');
  });

  test('should show ordered list if isOrdered = true', () => {
    document.body.innerHTML = makeComponent({ props: { isOrdered: true } });
    const $el = document.querySelector(qs);
    expect($el.tagName).toBe('OL');
  });

  test('should be empty by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el.innerHTML).toBe('');
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should render provided number of items', () => {
    document.body.innerHTML = makeComponent({ props: { items: ['item1', 'item2', 'item3'] } });
    const $el = document.querySelector(qs);
    const $items = $el.querySelectorAll('.list__item');
    expect($items.length).toBe(3);
  });
});
