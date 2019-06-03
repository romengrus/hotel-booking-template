import path from 'path';
import pug from 'pug';
// import { fireEvent } from 'dom-testing-library';
import { ChartDoughnut } from '../chart-doughnut';

const qs = ChartDoughnut.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'chart-doughnut.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

const data = [
  {
    value: 556,
    label: 'Великолепно',
    bg: 'linear-gradient(180deg, #FFE39C 0%, #FFBA9C 100%)'
  },
  {
    value: 342,
    label: 'Хорошо',
    bg: 'linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)'
  },
  {
    value: 227,
    label: 'Удовлетворительно',
    bg: 'linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%)'
  },
  {
    value: 0,
    label: 'Разочарован',
    bg: 'linear-gradient(180deg, #919191 0%, #3D4975 100%)'
  }
];

describe('Chart', () => {
  test('static getQuerySelector() should return component css selector', () => {
    expect(ChartDoughnut.getQuerySelector()).toBe('.chart-doughnut');
  });

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

  test('should have legend', () => {
    document.body.innerHTML = makeComponent({ props: { data } });
    const $el = document.querySelector(qs);
    const $legend = $el.querySelector('.chart-doughnut__legend');
    const $labels = $legend.querySelectorAll('.chart-doughnut__label');
    expect($legend).toBeInTheDocument();
    expect($labels.length).toBe(4);
  });

  test('should have chart display', () => {
    document.body.innerHTML = makeComponent({ props: { data } });
    const $el = document.querySelector(qs);
    const $display = $el.querySelector('.chart-doughnut__display');
    expect($display).toBeInTheDocument();
  });
});
