import uuid from 'uuid/v4'

class Component {
  constructor($el, app) {
    this._id = uuid()
    this.$el = $el
    this.app = app
    this.preInit()
  }

  get id() {
    return this._id
  }

  preInit() {
    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)
  }
}

export default Component
