/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as libraryComponents from './components/library'
import * as projectComponents from './components/project'
import Component from './components/Component'

const componentRegistry = {}

class App {
  constructor(registry) {
    this._registry = registry
  }

  registerComponent(component) {
    this._registry[component.id] = component
  }

  getComponent(componentId) {
    return this._registry[componentId]
  }
}

/**
 * Create and registers components in application
 * @param {object} app Application object
 * @param {class} ComponentClass
 */
const factory = (app, ComponentClass) => {
  const domSelector = ComponentClass.getDomSelector()
  const $elements = document.querySelectorAll(domSelector)
  $elements.forEach($el => app.registerComponent(new ComponentClass($el, app)))
}

const app = new App(componentRegistry)

document.addEventListener('DOMContentLoaded', () => {
  // override library components with project components with same name
  const overridenComponents = Object.values({ ...libraryComponents, ...projectComponents })
  // get only those components that inherit from Component class
  const components = overridenComponents.filter(obj => obj.prototype instanceof Component)

  Object.keys(components).forEach(name => {
    factory(app, components[name])
  })
})
