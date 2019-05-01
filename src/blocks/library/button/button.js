import { startRipple } from '../../effects/ripple/ripple'

const onButtonClick = e => {
  const button = e.currentTarget
  const hasRipple = button.classList.contains('button_has-ripple')

  if (hasRipple) {
    startRipple(button, e.clientX, e.clientY)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button')

  buttons.forEach(btn => btn.addEventListener('click', onButtonClick))
})
