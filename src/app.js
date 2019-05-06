import * as libraryComponents from './components/library'
import * as projectComponents from './components/project'

function factory(Component) {
  const qs = Component.getQuerySelector()
  const $elements = document.querySelectorAll(qs)
  return [...$elements].map($el => new Component($el))
}

document.addEventListener('DOMContentLoaded', () => {
  // override library components with project components with same name
  // TODO: check if project components do override library components
  Object.values({ ...libraryComponents, ...projectComponents }).map(Component => {
    if (typeof Component.getQuerySelector !== 'function') return null
    return factory(Component)
  })
})
