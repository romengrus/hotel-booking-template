import * as components from '../components';

function factory(Component) {
  const id = Component.getID();
  const qs = `[data-${id}]`;
  const elements = document.querySelectorAll(qs);
  return [...elements].map(el => new Component(el));
}

document.addEventListener('DOMContentLoaded', () => {
  Object.values({ ...components }).map(component => {
    if (typeof component.getID !== 'function') return null;
    return factory(component);
  });
});
