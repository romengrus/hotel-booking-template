import path from 'path';
import pug from 'pug';

const qs = '.icon';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'icon.test.pug');
const makeIcon = pug.compileFile(templatePath, { basedir });

describe('Icon', () => {
  test('should throw error if icon name is not provided', () => {
    expect(() => makeIcon()).toThrowError('name is not provided');
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeIcon({
      props: { name: 'test', mods: ['modifier1', 'modifier2'] }
    });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should use provided attributes', () => {
    document.body.innerHTML = makeIcon({ props: { name: 'test' }, attributes: { fill: 'red' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('fill', 'red');
  });
});
