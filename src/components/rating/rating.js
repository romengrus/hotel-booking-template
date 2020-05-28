import { debounce } from '../../utils';

class Rating {
  constructor(el) {
    const id = Rating.getID();
    this.el = el;
    this.icons = el.querySelectorAll(`[data-${id}-icon] [data-icon-img]`);
    this.isPartial = 'isPartial' in el.dataset;
    this.value = parseFloat(el.dataset.value || 0);
    this.iEmpty = el.dataset.iEmpty || 'star';
    this.iFilled = el.dataset.iFilled || 'star-active';
    this.iHalf = el.dataset.iHalf || 'star-half';
    this.init();
  }

  static getID() {
    return 'rating';
  }

  init() {
    this.attachEventHandlers();
    this.updateDOM(this.value);
  }

  updateDOM(ratingValue) {
    const { icons, iEmpty, iFilled, iHalf } = this;
    const currentValue = this.roundToNearestHalf(ratingValue);
    const activeIconsLength = Math.trunc(currentValue);
    const halfActiveIconsLength = currentValue - activeIconsLength;

    // Make all icons empty
    for (let i = 0; i < icons.length; i += 1) {
      icons[i].setAttribute('href', `#${iEmpty}`);
    }

    // Fill active icons
    for (let i = 0; i < activeIconsLength; i += 1) {
      icons[i].setAttribute('href', `#${iFilled}`);
    }

    // Fill half icons
    if (halfActiveIconsLength) {
      icons[activeIconsLength].setAttribute('href', `#${iHalf}`);
    }
  }

  /**
   * Round fractional number to nearest 0.5
   * (e.g.
   *  1.0 => 1.0;
   *  2.7 => 2.5;
   *  2.8 => 3;
   *  3.25 => 3;
   *  3.4 => 3.5;
   * )
   * @param {number} num Fractional number
   */
  roundToNearestHalf(num) {
    if (this.isPartial) {
      const fullNum = Math.trunc(num);
      const halfNum = Math.round((num - fullNum) * 2) / 2;

      return fullNum + halfNum;
    }

    return Math.round(num);
  }

  /**
   * Calculate rating value from absolute cursor position
   * @param {number} mouseClientX Position of mouse pointer on x axis
   */
  valueFromMousePos(mouseClientX) {
    const numIcons = this.icons.length;
    const rect = this.el.getBoundingClientRect();
    const x = mouseClientX - rect.left;
    const { width } = rect;

    return this.roundToNearestHalf((x / width) * numIcons);
  }

  dispatchVotedEvent() {
    const event = new CustomEvent('rating:voted', {
      detail: {
        value: this.value,
        objectId: this.objectId
      }
    });
    this.el.dispatchEvent(event);
  }

  attachEventHandlers() {
    const onMouseMoveDebounced = debounce(this.onMouseMove, 5, { leading: true });
    const onMouseMoveDebouncedBinded = onMouseMoveDebounced.bind(this);

    this.el.addEventListener('mousemove', e => onMouseMoveDebouncedBinded(e));
    this.el.addEventListener('mouseleave', e => this.onMouseLeave(e));
    this.el.addEventListener('click', e => this.onClick(e));
  }

  onMouseMove(e) {
    this.updateDOM(this.valueFromMousePos(e.clientX));
  }

  onMouseLeave() {
    this.updateDOM(this.value);
  }

  onClick(e) {
    this.value = this.valueFromMousePos(e.clientX);
    this.updateDOM(this.value);
    this.dispatchVotedEvent();
  }
}

export { Rating };
