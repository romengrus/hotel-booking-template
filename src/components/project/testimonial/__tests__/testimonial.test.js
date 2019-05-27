import path from 'path';
import pug from 'pug';

const qs = '.testimonial';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'testimonial.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Testimonial', () => {
  test('should throw error if userName is not provided', () => {
    expect(() => makeComponent({ props: { text: 'test text' } })).toThrow('user name is required');
  });

  test('should throw error if text is not provided', () => {
    expect(() => makeComponent({ props: { userName: 'test user' } })).toThrow('text is required');
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({
      props: { userName: 'test user', text: 'test text', mods: ['modifier1', 'modifier2'] }
    });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('testimonial', 'modifier1', 'modifier2');
  });
});
