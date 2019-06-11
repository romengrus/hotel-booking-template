import path from 'path';
import pug from 'pug';

const qs = '.hero';
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'hero.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Hero', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided mods', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('foo', 'bar');
  });

  test('should contain info text block if info is provided in props', () => {
    document.body.innerHTML = makeComponent({ props: { info: 'test info' } });
    const $el = document.querySelector(qs);
    const $info = $el.querySelector('.hero__info');
    expect($info).toBeInTheDocument();
    expect($info.textContent).toBe('test info');
  });

  test('should render single static image if only 1 image is provided in props.images', () => {
    document.body.innerHTML = makeComponent({ props: { images: ['image1'] } });
    const $el = document.querySelector(qs);
    const $image = $el.querySelector('.hero__image');
    const $slider = $el.querySelector('.hero__slider');
    expect($image).toBeInTheDocument();
    expect($slider).not.toBeInTheDocument();
  });

  test('should render slider if more then 1 image is provided in props.images', () => {
    document.body.innerHTML = makeComponent({ props: { images: ['image1', 'image2'] } });
    const $el = document.querySelector(qs);
    const $image = $el.querySelector('.hero__image');
    const $slider = $el.querySelector('.hero__slider');
    expect($image).not.toBeInTheDocument();
    expect($slider).toBeInTheDocument();
  });
});
