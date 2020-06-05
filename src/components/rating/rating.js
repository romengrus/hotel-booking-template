import { factory } from '../../scripts/factory';

class Rating {
  constructor(el) {
    const id = Rating.getID();
    this.el = el;
    this.iconEls = el.querySelectorAll(`[data-${id}-icon] [data-icon-img]`);
    this.isPartial = 'isPartial' in el.dataset;
    this.value = parseFloat(el.dataset.value);
    this.iEmpty = el.dataset.iEmpty;
    this.iFilled = el.dataset.iFilled;
    this.iHalf = el.dataset.iHalf;
    this.init();
  }

  static getID() {
    return 'rating';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
    this.updateDOM(this.value);
  }

  bindEventHandlers() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  attachEventHandlers() {
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
    this.el.addEventListener('click', this.onClick);
  }

  updateDOM(val) {
    const { iconEls: icons, iEmpty, iFilled, iHalf } = this;
    const current = this.roundToNearestHalf(val);
    const activeIconsLength = Math.trunc(current);
    const halfActiveIconsLength = current - activeIconsLength;

    // Make all icons empty
    icons.forEach(icon => icon.setAttribute('href', `#${iEmpty}`));

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
    const numIcons = this.iconEls.length;
    const rect = this.el.getBoundingClientRect();
    const x = mouseClientX - rect.left;
    const { width } = rect;

    return this.roundToNearestHalf((x / width) * numIcons);
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

  dispatchVotedEvent() {
    const event = new CustomEvent('rating:voted', {
      detail: {
        value: this.value
      }
    });

    this.el.dispatchEvent(event);
  }
}

factory(Rating);

export { Rating };
