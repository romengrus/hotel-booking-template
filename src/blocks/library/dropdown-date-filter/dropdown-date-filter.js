document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-date-filter').forEach(container => {
    const $icon = container.querySelector('.dropdown-date-filter__icon')
    const $footer = container.querySelector('.dropdown-date-filter__footer')

    $icon.addEventListener('click', () => {
      const footerHiddenClass = 'dropdown-date-filter__footer_hidden'
      if ($footer.classList.contains(footerHiddenClass)) {
        $footer.classList.remove(footerHiddenClass)
      } else {
        $footer.classList.add(footerHiddenClass)
      }
    })
  })
})
