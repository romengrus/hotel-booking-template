import hyperform from 'hyperform'
import uuid from 'uuid/v4'
import formValidationI18n from '../../../i18n/formValidation'

const lang = 'ru'

class Form {
  constructor($el, app) {
    this._id = uuid()
    this.$el = $el
    this.app = app
    this.formValidationClasses = {
      warning: 'form-field__warning-msg',
      valid: 'form-field__input_valid',
      invalid: 'form-field__input_invalid',
      validated: 'form-field__input_validated'
    }
    this.init()
  }

  get id() {
    return this._id
  }

  init() {
    this.configForm()

    // add id to dom component for future reference
    this.$el.setAttribute('data-component-id', this.id)
  }

  configForm() {
    hyperform(this.$el, {
      classes: this.formValidationClasses,
      validateNameless: true,
      preventImplicitSubmit: true
    })
    hyperform.addTranslation(lang, formValidationI18n[lang])
    hyperform.setLanguage(lang)
  }
}

export function factory(app) {
  const $forms = document.querySelectorAll('.form')
  $forms.forEach($form => {
    app.registerComponent(new Form($form, app))
  })
}
