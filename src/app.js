/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import libraryModules from 'blocks/library/**/*.js'
import projectComponents from 'blocks/project/**/*.js'

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

const app = new App(componentRegistry)

document.addEventListener('DOMContentLoaded', () => {
  // Register library components
  Object.keys(libraryModules).forEach(name => {
    const block = libraryModules[name]
    const component = block[name]
    component.factory(app)
  })

  // Register project components
  Object.keys(projectComponents).forEach(name => {
    const block = libraryModules[name]
    const component = block[name]
    component.factory(app)
  })
})
