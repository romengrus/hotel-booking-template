import { pluralize } from '../../utils';

class DropdownCounter {
  constructor(el) {
    const cls = DropdownCounter.getBaseCSSClass();
    this.el = el;
    this.input = el.querySelector(`${cls}__value`);
    this.inputAlt = el.querySelector(`${cls}__value-alt input`);
    this.toggler = el.querySelector(`${cls}__toggler`);
    this.ok = el.querySelector(`${cls}__ok`);
    this.reset = el.querySelector(`${cls}__reset`);
    this.counters = el.querySelectorAll(`${cls}__content [data-counter]`);
    this.resultType = el.dataset.resultType;
    this.plurals = JSON.parse(el.dataset.plurals);
    this._model = new Map();
    this.hasChanged = false;
    this.init();
    this.updateDOM();
  }

  static getBaseCSSClass() {
    return '.dropdown-counter';
  }

  init() {
    // const initialModel = this.countersProps.map(counter => {
    //   const { id, plurals, value } = counter;
    //   const numValue = value ? parseInt(value, 10) : 0;
    //   const strValue = `${numValue} ${pluralize(numValue, plurals)}`;

    //   return [id, { numValue, strValue }];
    // });
    // this._model = new Map(initialModel);

    this._attachEventHandlers();
  }

  updateDOM() {
    // sum of counters numValues
    const total = Array.from(this._model, ([, v]) => v.numValue).reduce((a, b) => a + b, 0);

    // set value for hidden input
    this.input.value = JSON.stringify([...this._model]);

    // set value for visible input
    if (this.resultType === 'total') {
      if (this.plurals.length === 3) {
        this.inputAlt.value = total === 0 ? '' : `${total} ${pluralize(total, this.plurals)}`;
      } else {
        this.inputAlt.value = total;
      }
    } else {
      this.inputAlt.value = Array.from(this._model)
        .map(([, v]) => v)
        .filter(v => v.numValue > 0)
        .map(v => v.strValue)
        .join(', ');
    }

    // toggle actions panel visibility
    if (this.hasChanged) {
      this.el.classList.add('dropdown-counter_visible-actions');
    }

    // toggle reset button visibility
    if (total >= 0) {
      this.reset.classList.add('dropdown-counter__reset_is-visible');
    } else {
      this.reset.classList.remove('dropdown-counter__reset_is-visible');
    }
  }

  updateModel({ id, numValue, strValue }) {
    this._model.set(id, { numValue, strValue });
    this.hasChanged = true;
    this.updateDOM();
  }

  _attachEventHandlers() {
    this.counters.forEach($counter => {
      $counter.addEventListener('counter:increased', e => this.updateModel(e.detail));
      $counter.addEventListener('counter:decreased', e => this.updateModel(e.detail));
    });
    // this.el.addEventListener('counter:increased', e => this.updateModel(e.detail));
    // this.el.addEventListener('counter:decreased', e => this.updateModel(e.detail));
    this.toggler.addEventListener('click', e => this._handleTogglerClick(e));
    this.reset.addEventListener('click', e => this._handleResetClick(e));
    this.ok.addEventListener('click', e => this._handleTogglerClick(e));
    this.inputAlt.addEventListener('focus', e => this._handleTogglerClick(e));
    // this.inputAlt.addEventListener('blur', e => this._handleTogglerClick(e));
  }

  _handleTogglerClick(e) {
    e.preventDefault();

    this.el.classList.toggle('dropdown-counter_is-collapsed');
  }

  _handleResetClick(e) {
    e.preventDefault();

    // reset model
    // const model = this.countersProps.map(counter => {
    //   const { id, plurals } = counter;
    //   const numValue = 0;
    //   const strValue = `${numValue} ${pluralize(numValue, plurals)}`;

    //   return [id, { numValue, strValue }];
    // });
    // this._model = new Map(model);
    this._model = new Map();

    // reset counters
    this.counters.forEach($counter => $counter.dispatchEvent(new Event('counter:reset')));

    this.updateDOM();
  }
}

export { DropdownCounter };
