import uuid from 'uuid/v4'

class Button {
  constructor($el, app) {
    this._id = uuid()
    this.$el = $el
    this.app = app
    this.init()
  }

  get id() {
    return this._id
  }

  init() {
    this._attachEventHandlers()

    // add id to dom component for future reference
    this.$el.setAttribute('data-compoent-id', this.id)
  }

  _attachEventHandlers() {
    this.$el.addEventListener('click', e => {
      if (this.$el.classList.contains('button_has-ripple')) {
        this._showRipple(e)
      }
    })
  }

  _showRipple(e) {
    const $rippleEl = document.createElement('div')
    const rect = this.$el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Move ripple block center to mouse click coords
    $rippleEl.style.top = `${y}px`
    $rippleEl.style.left = `${x}px`

    this.$el.appendChild($rippleEl)
    $rippleEl.classList.add('button_ripple-effect')

    window.setTimeout(() => {
      this.$el.removeChild($rippleEl)
    }, 1000)
  }
}

export function factory(app) {
  const $buttons = document.querySelectorAll('.button')
  $buttons.forEach($btn => {
    app.registerComponent(new Button($btn, app))
  })
}
