import * as libraryComponents from '../components/library';
import * as projectComponents from '../components/project';

function factory(Component) {
  const qs = Component.getBaseCSSClass();
  const $elements = document.querySelectorAll(qs);
  return [...$elements].map($el => new Component($el));
}

document.addEventListener('DOMContentLoaded', () => {
  Object.values({ ...libraryComponents, ...projectComponents }).map(Component => {
    if (typeof Component.getBaseCSSClass !== 'function') return null;
    return factory(Component);
  });
});
