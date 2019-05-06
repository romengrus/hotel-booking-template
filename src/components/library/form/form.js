import hyperform from 'hyperform'
import formValidationI18n from '../../../i18n/formValidation'
import Component from '../../Component'

const lang = 'ru'

export class Form extends Component {
  constructor($el, app) {
    super($el, app)
    this.formValidationClasses = {
      warning: 'form-field__warning-msg',
      valid: 'form-field_valid',
      invalid: 'form-field_invalid',
      validated: 'form-field_validated'
    }
    this.init()
  }

  static getDomSelector() {
    return '.form'
  }

  init() {
    hyperform(this.$el, {
      classes: this.formValidationClasses,
      validateNameless: true,
      preventImplicitSubmit: true
    })
    hyperform.addTranslation(lang, formValidationI18n[lang])
    hyperform.setLanguage(lang)
  }
}
