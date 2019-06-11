import path from 'path';
import pug from 'pug';
import { Slider } from '../slider';

const qs = Slider.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'slider.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Slider', () => {
  test('should have ".slider" as main class', () => {
    expect(Slider.getQuerySelector()).toBe('.swiper-container');
  });

  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided modifier classes', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('foo', 'bar');
  });

  test('should JSON.stringify slider params to "data-params" attribute', () => {
    const params = { foo: 'bar', abc: 'abc' };
    document.body.innerHTML = makeComponent({ props: { params } });
    const $el = document.querySelector(qs);
    const sliderParams = JSON.parse($el.dataset.params);
    expect(sliderParams).toEqual(params);
  });

  test('should render slides if slides are provided in props.slides', () => {
    const slides = [
      {
        img: 'img1.jpg'
      },
      {
        img: 'img2.jpg'
      }
    ];
    document.body.innerHTML = makeComponent({ props: { slides } });
    const $el = document.querySelector(qs);
    const $slides = $el.querySelectorAll('.swiper-slide');
    expect($slides.length).toBe(2);
    expect($slides[0]).toHaveStyle('background-image: url(img1.jpg)');
  });

  test('should render pagination if pagination config is provided in props.params.pagination', () => {
    const params = { pagination: {} };
    document.body.innerHTML = makeComponent({ props: { params } });
    const $el = document.querySelector(qs);
    const $pagination = $el.querySelector('.swiper-pagination');
    expect($pagination).toBeInTheDocument();
  });

  test('should render navigation buttons if navigation config is provided in props.params.navigation', () => {
    const params = { navigation: {} };
    document.body.innerHTML = makeComponent({ props: { params } });
    const $el = document.querySelector(qs);
    const $prev = $el.querySelector('.swiper-button-prev');
    const $next = $el.querySelector('.swiper-button-next');
    expect($prev).toBeInTheDocument();
    expect($next).toBeInTheDocument();
  });

  test('should render scrollbar if scrollbar config is provided in props.params.scrollbar', () => {
    const params = { scrollbar: {} };
    document.body.innerHTML = makeComponent({ props: { params } });
    const $el = document.querySelector(qs);
    const $scrollbar = $el.querySelector('.swiper-scrollbar');
    expect($scrollbar).toBeInTheDocument();
  });

  test('should initialize slider', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const slider = new Slider($el);
    expect(slider.slider).not.toBe(null);
  });
});
