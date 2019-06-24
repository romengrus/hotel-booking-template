import { pluralize } from '../../../l10n/utils';

export class DropdownCounter {
  constructor($el) {
    this.$el = $el;
    this.$header = $el.querySelector('.dropdown-counter__header');
    this.$body = $el.querySelector('.dropdown-counter__body');
    this.$actionsPanel = $el.querySelector('.dropdown-counter__actions-panel');
    this.$input = $el.querySelector('.dropdown-counter__value');
    this.$inputAlt = $el.querySelector('.dropdown-counter__value-alt');
    this.$toggler = $el.querySelector('.dropdown-counter__toggler');
    this.$ok = $el.querySelector('.dropdown-counter__ok');
    this.$reset = $el.querySelector('.dropdown-counter__reset');
    this.$counters = $el.querySelectorAll('.dropdown-counter__counter');
    this.countersProps = JSON.parse($el.dataset.countersProps);
    this.displayType = $el.dataset.displayType || 'total';
    this.plurals = JSON.parse($el.dataset.plurals) || [];
    this._model = null;
    this.hasChanged = false;
    this.init();
    this.updateDOM();
  }

  static getQuerySelector() {
    return '.dropdown-counter';
  }

  init() {
    const initialModel = this.countersProps.map(counter => {
      const { objectId, plurals, value } = counter;
      const numValue = value ? parseInt(value, 10) : 0;
      const strValue = `${numValue} ${pluralize(numValue, plurals)}`;

      return [objectId, { numValue, strValue }];
    });
    this._model = new Map(initialModel);

    this._attachEventHandlers();
  }

  updateDOM() {
    // sum of counters numValues
    const total = Array.from(this._model, ([, v]) => v.numValue).reduce((a, b) => a + b, 0);

    // set value for hidden input
    this.$input.value = JSON.stringify([...this._model]);

    // set value for visible input
    if (this.displayType === 'total') {
      if (this.plurals.length === 3) {
        this.$inputAlt.value = total === 0 ? '' : `${total} ${pluralize(total, this.plurals)}`;
      } else {
        this.$inputAlt.value = total;
      }
    } else if (this.displayType === 'concat') {
      const concat = Array.from(this._model)
        .map(([, v]) => v)
        .filter(v => v.numValue > 0)
        .map(v => v.strValue)
        .join(', ');
      this.$inputAlt.value = concat;
    }

    // toggle actions panel visibility
    if (this.hasChanged) {
      this.$actionsPanel.classList.remove('dropdown-counter__actions-panel_hidden');
    }

    // toggle reset button visibility
    if (total === 0) {
      this.$reset.classList.add('dropdown-counter__reset_hidden');
    } else {
      this.$reset.classList.remove('dropdown-counter__reset_hidden');
    }
  }

  updateModel({ id, numValue, strValue }) {
    this._model.set(id, { numValue, strValue });
    this.hasChanged = true;
    this.updateDOM();
  }

  _attachEventHandlers() {
    this.$counters.forEach($counter => {
      $counter.addEventListener('counter:increased', e => this.updateModel(e.detail));
      $counter.addEventListener('counter:decreased', e => this.updateModel(e.detail));
    });
    this.$toggler.addEventListener('click', e => this._handleTogglerClick(e));
    this.$reset.addEventListener('click', e => this._handleResetClick(e));
    this.$ok.addEventListener('click', e => this._handleTogglerClick(e));
    this.$inputAlt.addEventListener('focus', e => this._handleTogglerClick(e));
    this.$inputAlt.addEventListener('blur', e => this._handleTogglerClick(e));
  }

  _handleTogglerClick(e) {
    e.preventDefault();

    this.$toggler.classList.toggle('dropdown-counter__toggler_collapsed');
    this.$header.classList.toggle('dropdown-counter__header_collapsed');
    this.$body.classList.toggle('dropdown-counter__body_collapsed');
  }

  _handleResetClick(e) {
    e.preventDefault();

    // reset model
    const model = this.countersProps.map(counter => {
      const { objectId, plurals } = counter;
      const numValue = 0;
      const strValue = `${numValue} ${pluralize(numValue, plurals)}`;

      return [objectId, { numValue, strValue }];
    });
    this._model = new Map(model);

    // reset counters
    this.$counters.forEach($counter => $counter.dispatchEvent(new Event('counter:reset')));

    this.updateDOM();
  }
}
