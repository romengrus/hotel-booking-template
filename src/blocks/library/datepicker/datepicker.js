import Pikaday from 'pikaday'

const iconPrev = `<svg class="icon icon-arrow-left"><use xlink:href="#arrow-left"/></svg>`
const iconNext = `<svg class="icon icon-arrow-right"><use xlink:href="#arrow-right"/></svg>`

const i18n = {
  previousMonth: iconPrev,
  nextMonth: iconNext,
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.datepicker').forEach(container => {
    const inputId = container.getAttribute('data-input-id')
    const picker = new Pikaday({
      i18n,
      field: inputId,
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true
    })
    const boundedInput = document.querySelector(`#${inputId}`)

    const contentNode = container.querySelector('.datepicker__content')
    contentNode.appendChild(picker.el)

    // Handle reset button click
    const btnReset = container.querySelector('.datepicker__btn-reset')
    btnReset.addEventListener('click', () => {
      picker.setDate(new Date())
      if (boundedInput) {
        boundedInput.value = picker.toString('DD.MM.YYYY')
      }
    })

    // Handle ok button click
    const btnOk = container.querySelector('.datepicker__btn-ok')
    btnOk.addEventListener('click', () => {
      if (boundedInput) {
        boundedInput.value = picker.toString('DD.MM.YYYY')
      }
    })
  })
})
