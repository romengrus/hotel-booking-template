import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { Panel } from '../panel';

const qs = Panel.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'panel.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Panel', () => {
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

  test('should apply provided attributes', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    expect($el).toHaveAttribute('foo', 'bar');
  });

  test('should be collapsible by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const panel = new Panel($el);
    expect($el).toHaveAttribute('data-is-collapsible');
    expect(panel.isCollapsible).toBe(true);
  });

  test('should not be collapsible if isCollapsible = false', () => {
    document.body.innerHTML = makeComponent({ props: { isCollapsible: false } });
    const $el = document.querySelector(qs);
    const panel = new Panel($el);
    expect($el).not.toHaveAttribute('data-is-collapsible');
    expect(panel.isCollapsible).toBe(false);
  });

  test('panel body should be visible by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $body = $el.querySelector('.panel__body');
    expect($body).not.toHaveClass('panel__body_collapsed');
  });

  test('panel body should be hidden if isCollapsed = true', () => {
    document.body.innerHTML = makeComponent({ props: { isCollapsed: true } });
    const $el = document.querySelector(qs);
    const $body = $el.querySelector('.panel__body');
    expect($body).toHaveClass('panel__body_collapsed');
  });

  test('clicking on toggler should toggle body visibility', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const panel = new Panel($el);
    const $body = $el.querySelector('.panel__body');
    const $toggler = $el.querySelector('.panel__toggler');
    expect($toggler).not.toHaveClass('panel__toggler_collapsed');
    expect($body).not.toHaveClass('panel__body_collapsed');
    fireEvent.click($toggler);
    expect($toggler).toHaveClass('panel__toggler_collapsed');
    expect($body).toHaveClass('panel__body_collapsed');
  });

  test('clicking on title should toggle body visibility', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    // eslint-disable-next-line no-unused-vars
    const panel = new Panel($el);
    const $header = $el.querySelector('.panel__title');
    const $body = $el.querySelector('.panel__body');
    const $toggler = $el.querySelector('.panel__toggler');
    expect($toggler).not.toHaveClass('panel__toggler_collapsed');
    expect($body).not.toHaveClass('panel__body_collapsed');
    fireEvent.click($header);
    expect($toggler).toHaveClass('panel__toggler_collapsed');
    expect($body).toHaveClass('panel__body_collapsed');
  });
});
