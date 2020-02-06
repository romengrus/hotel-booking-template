import * as components from '../components';

function factory(Component) {
  const qs = Component.getBaseCSSClass();
  const elements = document.querySelectorAll(qs);
  return [...elements].map(el => new Component(el));
}

document.addEventListener('DOMContentLoaded', () => {
  Object.values({ ...components }).map(component => {
    if (typeof component.getBaseCSSClass !== 'function') return null;
    return factory(component);
  });
});
