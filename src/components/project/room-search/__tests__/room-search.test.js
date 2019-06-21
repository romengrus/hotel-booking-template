import path from 'path';
import pug from 'pug';
import { RoomSearch } from '../room-search';

const qs = RoomSearch.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'room-search.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Room Search', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should have form wrapper', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.room-search__form');
    expect($form).toBeInTheDocument();
  });

  test('should apply provided attributes to form wrapper', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $form = $el.querySelector('.room-search__form');
    expect($form).toHaveAttribute('foo', 'bar');
  });

  test('should have title with provided text', () => {
    const labels = { title: 'Test title' };
    document.body.innerHTML = makeComponent({ props: { labels } });
    const $el = document.querySelector(qs);
    const $title = $el.querySelector('.room-search__title');
    expect($title).toBeInTheDocument();
    expect($title.textContent).toBe(labels.title);
  });

  test('should have arrival date input', () => {
    const labels = { arrival: 'Test title' };
    document.body.innerHTML = makeComponent({ props: { labels } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.room-search__arrival-input');
    const $label = $el.querySelector('.room-search__arrival-label');
    expect($input).toBeInTheDocument();
    expect($label).toBeInTheDocument();
    expect($label.textContent).toBe(labels.arrival);
  });

  test('should have departure date input', () => {
    const labels = { departure: 'Test title' };
    document.body.innerHTML = makeComponent({ props: { labels } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.room-search__departure-input');
    const $label = $el.querySelector('.room-search__departure-label');
    expect($input).toBeInTheDocument();
    expect($label).toBeInTheDocument();
    expect($label.textContent).toBe(labels.departure);
  });

  test('should have guests input', () => {
    const labels = { guests: 'Test title' };
    document.body.innerHTML = makeComponent({ props: { labels } });
    const $el = document.querySelector(qs);
    const $input = $el.querySelector('.room-search__guests-input');
    const $label = $el.querySelector('.room-search__guests-label');
    expect($input).toBeInTheDocument();
    expect($label).toBeInTheDocument();
    expect($label.textContent).toBe(labels.guests);
  });

  test('should have submit button', () => {
    const labels = { submit: 'Test title' };
    document.body.innerHTML = makeComponent({ props: { labels } });
    const $el = document.querySelector(qs);
    const $btn = $el.querySelector('.room-search__submit');
    expect($btn).toBeInTheDocument();
    expect($btn.textContent).toBe(labels.submit);
  });
});
