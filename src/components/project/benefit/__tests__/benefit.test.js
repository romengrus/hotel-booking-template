import path from 'path';
import pug from 'pug';

const qs = '.benefit';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'benefit.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Benefit', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const component = document.querySelector(qs);
    expect(component).toBeInTheDocument();
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const component = document.querySelector(qs);
    expect(component).toHaveClass('modifier1', 'modifier2');
  });

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const component = document.querySelector(qs);
    expect(component).toHaveAttribute('foo', 'bar');
  });

  test('should contain icon if iconName is provided', () => {
    document.body.innerHTML = makeComponent({ props: { iconName: 'emoticon-happy' } });
    const component = document.querySelector(qs);
    const icon = component.querySelector('.icon');
    expect(icon).toBeInTheDocument();
  });

  test('should contain title heading element if title is provided', () => {
    document.body.innerHTML = makeComponent({ props: { title: 'Benefit 1' } });
    const component = document.querySelector(qs);
    const title = component.querySelector('.benefit__title');
    expect(title).toBeInTheDocument();
  });

  test('should contain description text if provided', () => {
    document.body.innerHTML = makeComponent({ props: { desc: 'Description 1' } });
    const component = document.querySelector(qs);
    const desc = component.querySelector('.benefit__desc');
    expect(desc).toBeInTheDocument();
  });
});
