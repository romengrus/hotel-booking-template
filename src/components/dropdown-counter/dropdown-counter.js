import { pluralize } from '../../utils';

class DropdownCounter {
  constructor(el) {
    const id = DropdownCounter.getID();
    this.el = el;
    this.input = el.querySelector(`[data-${id}-value]`);
    this.inputAlt = el.querySelector(`[data-${id}-alt]`);
    this.toggler = el.querySelector(`[data-${id}-toggler]`);
    this.ok = el.querySelector(`[data-${id}-ok]`);
    this.reset = el.querySelector(`[data-${id}-reset]`);
    this.counters = el.querySelectorAll(`[data-${id}-ok]`);
    this.resultType = el.dataset.resultType;
    this.plurals = JSON.parse(el.dataset.plurals);
    this._model = new Map();
    this.hasChanged = false;
    // this.init();
    // this.updateDOM();
  }

  static getID() {
    return 'dropdown-counter';
  }

  init() {
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

    this._model = new Map();

    // reset counters
    this.counters.forEach($counter => $counter.dispatchEvent(new Event('counter:reset')));

    this.updateDOM();
  }
}

export { DropdownCounter };
