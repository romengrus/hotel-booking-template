/**
 * find inner ripple element and start animation
 * @param {Node} containerNode Node element to which ripple effect should be applied
 * @param {number} xPos mouse click x coordinate
 * @param {number} yPos mouse click y coordinate
 */
export const startRipple = (containerNode, xPos, yPos) => {
  const ripple = containerNode.querySelector('.ripple')

  const rect = containerNode.getBoundingClientRect()
  const x = xPos - rect.left
  const y = yPos - rect.top

  const rh = ripple.offsetHeight
  const rw = ripple.offsetWidth

  // Move ripple block center to mouse click coords
  ripple.style.top = `${y - rh / 2}px`
  ripple.style.left = `${x - rw / 2}px`

  ripple.classList.add('ripple_active')
}

// hide ripple on animation end
document.addEventListener('DOMContentLoaded', () => {
  const ripples = document.querySelectorAll('.ripple')
  const onRippleEnd = e => e.target.classList.remove('ripple_active')

  ripples.forEach(ripple =>
    [
      'animationend',
      'webkitAnimationEnd',
      'oAnimationEnd',
      'oanimationend',
      'MSAnimationEnd'
    ].forEach(evt => ripple.addEventListener(evt, onRippleEnd))
  )
})
