import { inc, dec, not } from '../../scripts/utils';
import { factory } from '../../scripts/factory';

class Like {
  constructor(el) {
    const id = Like.getID();
    this.el = el;
    this.displayEl = el.querySelector(`[data-${id}-display]`);
    this.iconEl = el.querySelector(`[data-${id}-icon]`);
    this.value = parseInt(el.dataset.value, 10);
    this.hasVoted = 'hasVoted' in el.dataset;
    this.iLike = el.dataset.iLike;
    this.iDislike = el.dataset.iDislike;
    this.init();
  }

  static getID() {
    return 'like';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.handleClick = this.handleClick.bind(this);
  }

  attachEventHandlers() {
    this.el.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.value = this.hasVoted ? dec(this.value) : inc(this.value);
    this.hasVoted = not(this.hasVoted);

    this.displayEl.textContent = this.value;
    this.iconEl.setAttribute('href', `#${this.hasVoted ? this.iLike : this.iDislike}`);

    if (this.hasVoted) {
      this.el.classList.add('like_has-voted');
    } else {
      this.el.classList.remove('like_has-voted');
    }

    this.dispatchVotedEvent();
  }

  dispatchVotedEvent() {
    const event = new CustomEvent('like:voted', {
      detail: {
        value: this.value
      }
    });
    this.el.dispatchEvent(event);
  }
}

factory(Like);

export { Like };
