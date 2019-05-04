/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import libraryComponents from './components/library/**/*.js'
import projectComponents from './components/project/**/*.js'
import BaseComponent from './components/Component'

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
 * Creates components and registers them in application
 * @param {object} app Application object
 * @param {class} Component Component class
 */
const factory = (app, Component) => {
  const domSelector = Component.getDomSelector()
  const $elements = document.querySelectorAll(domSelector)
  // eslint-disable-next-line no-console
  if (!$elements) console.info(`No components with ${Component.getDomSelector()} selector found`)
  $elements.forEach($el => app.registerComponent(new Component($el, app)))
}

const app = new App(componentRegistry)

document.addEventListener('DOMContentLoaded', () => {
  // Register library components
  const allComponents = { ...libraryComponents, ...projectComponents }
  Object.keys(allComponents)
    // get component module
    .map(name => {
      const Component = allComponents[name][name].default
      if (Component === undefined) throw new Error(`No default exported member in ${name}.js`)
      if (!(Component.prototype instanceof BaseComponent))
        throw new Error(`${name} component does not inherit from Component`)
      return Component
    })
    // create and register components
    .forEach(Component => factory(app, Component))
})
