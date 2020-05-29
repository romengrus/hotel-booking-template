import { pluralize, not } from '../../utils';

class DropdownCounter {
  constructor(el) {
    const id = DropdownCounter.getID();
    this.el = el;
    this.inputEl = el.querySelector(`[data-${id}-value]`);
    this.inputAltEl = el.querySelector(`[data-${id}-alt]`);
    this.togglerEl = el.querySelector(`[data-${id}-toggler]`);
    this.okEl = el.querySelector(`[data-${id}-ok]`);
    this.resetEl = el.querySelector(`[data-${id}-reset]`);
    this.counterEls = el.querySelectorAll(`[data-counter]`);
    this.actionsEl = el.querySelector(`[data-${id}-actions]`);
    this.resultType = el.dataset.resultType;
    this.plurals = JSON.parse(el.dataset.plurals);
    this.model = new Map();
    this.init();
    this.updateDOM();
  }

  static getID() {
    return 'dropdown-counter';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.updateModel = this.updateModel.bind(this);
    this.handleValueAltClick = this.handleValueAltClick.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleCounterUpdate = this.handleCounterUpdate.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
    this.toggleCounters = this.toggleCounters.bind(this);
    this.showCounters = this.showCounters.bind(this);
    this.hideCounters = this.hideCounters.bind(this);
  }

  attachEventHandlers() {
    this.el.addEventListener('counter:increased', this.handleCounterUpdate);
    this.el.addEventListener('counter:decreased', this.handleCounterUpdate);
    this.resetEl.addEventListener('click', this.handleResetClick);
    this.okEl.addEventListener('click', this.handleOkClick);
    this.inputAltEl.addEventListener('click', this.handleValueAltClick);
    this.inputAltEl.addEventListener('focusout', this.handleFocusOut);
    this.togglerEl.addEventListener('click', this.handleValueAltClick);
  }

  updateDOM() {
    // sum of counters numValues
    const total = Array.from(this.model, ([, v]) => v.numValue).reduce((a, b) => a + b, 0);

    // set value for hidden input
    this.inputEl.value = JSON.stringify([...this.model]);

    // set value for visible input
    if (this.resultType === 'total') {
      if (this.plurals.length === 3) {
        this.inputAltEl.value = total === 0 ? '' : `${total} ${pluralize(total, this.plurals)}`;
      } else {
        this.inputAltEl.value = total;
      }
    } else {
      this.inputAltEl.value = Array.from(this.model)
        .map(([, v]) => v)
        .filter(v => v.numValue > 0)
        .map(v => v.strValue)
        .join(', ');
    }

    // toggle actions panel visibility
    this.el.classList.add('dropdown-counter_visible-actions');

    // toggle reset button visibility
    if (total > 0) {
      this.resetEl.classList.add('dropdown-counter__reset_is-visible');
    } else {
      this.resetEl.classList.remove('dropdown-counter__reset_is-visible');
    }
  }

  updateModel({ id, numValue, strValue }) {
    this.model.set(id, { numValue, strValue });
    this.updateDOM();
  }

  showCounters() {
    this.el.classList.remove('dropdown-counter_is-collapsed');
  }

  hideCounters() {
    this.el.classList.add('dropdown-counter_is-collapsed');
  }

  toggleCounters() {
    this.el.classList.toggle('dropdown-counter_is-collapsed');
  }

  handleValueAltClick() {
    this.toggleCounters();
  }

  handleFocusOut(e) {
    const isInside = this.el.contains(e.relatedTarget);
    if (not(isInside)) {
      this.hideCounters();
    }
  }

  handleCounterUpdate(e) {
    this.updateModel(e.detail);
  }

  handleResetClick() {
    this.model = new Map();

    // reset counters
    this.counterEls.forEach(c => c.dispatchEvent(new Event('counter:reset')));

    this.updateDOM();
  }

  handleOkClick() {
    this.hideCounters();
  }
}

export { DropdownCounter };
