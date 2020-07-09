import { pluralize, not } from '../../scripts/utils';
import { factory } from '../../scripts/factory';

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
    this.showActions = 'showActions' in el.dataset;
    this.model = new Map();
    this.init();
    this.updateDOM();
  }

  static getID() {
    return 'dropdown-counter';
  }

  init() {
    this.attachEventHandlers();

    // populate model from initial counter values
    this.counterEls.forEach(c => c.dispatchEvent(new Event('counter:getValue')));
  }

  attachEventHandlers() {
    this.el.addEventListener('counter:increased', this.handleCounterUpdate);
    this.el.addEventListener('counter:decreased', this.handleCounterUpdate);
    this.el.addEventListener('counter:notify', this.handleCounterUpdate);
    this.resetEl.addEventListener('click', this.handleResetClick);
    this.okEl.addEventListener('click', this.handleOkClick);
    this.inputAltEl.addEventListener('click', this.handleValueAltClick);
    this.inputAltEl.addEventListener('focusout', this.handleFocusOut);
    this.togglerEl.addEventListener('click', this.handleValueAltClick);
  }

  updateDOM() {
    // sum of counters numValues
    const total = Array.from(this.model, ([, v]) => v.numValue).reduce((a, b) => a + b, 0);

    // get special counters
    const special = Array.from(this.model, ([, v]) => ({ ...v }))
      .filter(v => v.isSpecial && v.numValue > 0)
      .map(v => v.strValue)
      .join(', ');

    // set value for hidden input
    this.inputEl.value = JSON.stringify([...this.model]);

    // set value for visible input
    if (this.resultType === 'total') {
      if (this.plurals.length === 3) {
        let newValue = total === 0 ? '' : `${total} ${pluralize(total, this.plurals)}`;

        if (special) {
          newValue += `, ${special}`;
        }

        this.inputAltEl.value = newValue;
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

    // toggle reset button visibility
    if (total > 0) {
      this.resetEl.classList.add('dropdown-counter__reset_is-visible');
    } else {
      this.resetEl.classList.remove('dropdown-counter__reset_is-visible');
    }
  }

  updateModel = ({ id, numValue, strValue, isSpecial }) => {
    this.model.set(id, { numValue, strValue, isSpecial });
    this.updateDOM();
  };

  showActionsPanel() {
    this.el.classList.add('dropdown-counter_visible-actions');
  }

  showCounters = () => {
    this.el.classList.remove('dropdown-counter_is-collapsed');
  };

  hideCounters = () => {
    this.el.classList.add('dropdown-counter_is-collapsed');
  };

  toggleCounters = () => {
    this.el.classList.toggle('dropdown-counter_is-collapsed');
  };

  handleValueAltClick = () => {
    this.toggleCounters();
  };

  handleFocusOut = e => {
    const isInside = this.el.contains(e.relatedTarget);
    if (not(isInside)) {
      this.hideCounters();
    }
  };

  handleCounterUpdate = e => {
    this.updateModel(e.detail);

    if (this.showActions) {
      this.showActionsPanel();
    }
  };

  handleResetClick = e => {
    e.preventDefault();
    this.model = new Map();

    // reset counters
    this.counterEls.forEach(c => c.dispatchEvent(new Event('counter:reset')));

    this.updateDOM();
  };

  handleOkClick = e => {
    e.preventDefault();
    this.hideCounters();
  };
}

factory(DropdownCounter);

export { DropdownCounter };
