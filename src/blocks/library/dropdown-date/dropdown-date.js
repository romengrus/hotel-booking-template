document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-date').forEach(container => {
    const $icon = container.querySelector('.dropdown-date__icon')
    const $footer = container.querySelector('.dropdown-date__footer')

    $icon.addEventListener('click', () => {
      const footerHiddenClass = 'dropdown-date__footer_hidden'
      if ($footer.classList.contains(footerHiddenClass)) {
        $footer.classList.remove(footerHiddenClass)
      } else {
        $footer.classList.add(footerHiddenClass)
      }
    })
  })
})
