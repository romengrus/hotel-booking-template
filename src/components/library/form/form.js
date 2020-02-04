import hyperform from 'hyperform';

import formValidationI18n from '../../../i18n/formValidation';

export class Form {
  constructor($el) {
    this.lang = 'ru';
    this.$el = $el;
    this.formValidationClasses = {
      warning: 'form-field__warning-msg',
      valid: 'form-field_valid',
      invalid: 'form-field_invalid',
      validated: 'form-field_validated'
    };
    this.init();
  }

  static getBaseCSSClass() {
    return '.form';
  }

  init() {
    hyperform(this.$el, {
      classes: this.formValidationClasses,
      validateNameless: true,
      preventImplicitSubmit: true
    });
    hyperform.addTranslation(this.lang, formValidationI18n[this.lang]);
    hyperform.setLanguage(this.lang);
  }
}
