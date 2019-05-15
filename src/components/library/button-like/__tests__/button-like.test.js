import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { ButtonLike } from '../button-like';

const qs = ButtonLike.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'button-like.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Button Like', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should contain icon component', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.icon');
    expect($icon).toBeInTheDocument();
  });

  test('should render provided value', () => {
    document.body.innerHTML = makeComponent({ props: { value: 5 } });
    const $el = document.querySelector(qs);
    expect($el).toHaveTextContent('5');
  });

  test('should have hasVoted flag value set to false', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const component = new ButtonLike($el);
    expect($el.dataset.hasVoted).toBe(undefined);
    expect(component.hasVoted).toBe(false);
  });

  test('should set hasVoted flag to provided value', () => {
    document.body.innerHTML = makeComponent({ props: { hasVoted: true } });
    const $el = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const component = new ButtonLike($el);
    expect($el.dataset.hasVoted).toBe('data-has-voted');
    expect(component.hasVoted).toBe(true);
  });

  test('should use provided icon for "like"', () => {
    const iconName = 'test-icon';
    document.body.innerHTML = makeComponent({ props: { iconLike: iconName, hasVoted: true } });
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.icon > use');
    // eslint-disable-next-line no-unused-vars
    expect($el.dataset.iconLike).toBe(iconName);
    expect($icon).toHaveAttribute('href', `#${iconName}`);
  });

  test('should use provided icon for "dislike"', () => {
    const iconName = 'test-icon';
    document.body.innerHTML = makeComponent({ props: { iconDislike: iconName, hasVoted: false } });
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.icon > use');
    // eslint-disable-next-line no-unused-vars
    expect($el.dataset.iconDislike).toBe(iconName);
    expect($icon).toHaveAttribute('href', `#${iconName}`);
  });

  test('should increase & decrease likes properly', () => {
    const iconLike = 'icon-like';
    const iconDislike = 'icon-dislike';
    document.body.innerHTML = makeComponent({ props: { iconLike, iconDislike } });
    const $el = document.querySelector(qs);
    const $icon = $el.querySelector('.icon > use');
    expect($el).toHaveTextContent('0');
    expect($el).toHaveAttribute('data-value', '0');
    // eslint-disable-next-line no-unused-vars
    const buttonLike = new ButtonLike($el);
    fireEvent.click($el);
    expect($el).toHaveTextContent('1');
    expect($el).toHaveAttribute('data-value', '1');
    expect($icon).toHaveAttribute('href', `#${iconLike}`);
    fireEvent.click($el);
    expect($el).toHaveTextContent('0');
    expect($el).toHaveAttribute('data-value', '0');
    expect($icon).toHaveAttribute('href', `#${iconDislike}`);
  });

  test('should dispatch event on click with new number of likes & object id', () => {
    const objectId = 'article-123';
    document.body.innerHTML = makeComponent({ props: { objectId } });
    const $el = document.querySelector(qs);
    const listenerMock = jest.fn();
    $el.addEventListener('buttonLike:voted', e => listenerMock(e));
    // eslint-disable-next-line no-unused-vars
    const buttonLike = new ButtonLike($el);
    fireEvent.click($el);
    expect(listenerMock).toBeCalled();
    // eslint-disable-next-line prefer-destructuring
    const detail = listenerMock.mock.calls[0][0].detail;
    expect(detail.value).toBe(1);
    expect(detail.objectId).toBe(objectId);
  });

  test('should have "button-like_has-voted" class when hasVoted = true', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const buttonLike = new ButtonLike($el);
    expect($el).not.toHaveClass('button-like_has-voted');
    fireEvent.click($el);
    expect($el).toHaveClass('button-like_has-voted');
    fireEvent.click($el);
    expect($el).not.toHaveClass('button-like_has-voted');
  });

  test('should use provided object id', () => {
    const objectId = 'article-123';
    document.body.innerHTML = makeComponent({ props: { objectId } });
    const $el = document.querySelector(qs);
    const buttonLike = new ButtonLike($el);
    expect($el.dataset.objectId).toBe(objectId);
    expect(buttonLike.objectId).toBe(objectId);
  });
});
