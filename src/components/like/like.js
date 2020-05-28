class Like {
  constructor(el) {
    const id = Like.getID();
    this.el = el;
    this.display = el.querySelector(`[data-${id}-display]`);
    this.icon = el.querySelector(`[data-${id}-icon] > use`);
    this.value = parseInt(el.dataset.value, 10);
    this.objectId = el.dataset.objectId;
    this.hasVoted = !!el.dataset.hasVoted;
    this.iconLike = el.dataset.iconLike;
    this.iconDislike = el.dataset.iconDislike;
    this.init();
  }

  static getID() {
    return 'like';
  }

  init() {
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.el.addEventListener('click', () => this.handleButtonClick());
  }

  handleButtonClick() {
    if (this.hasVoted) {
      this.value -= 1;
    } else {
      this.value += 1;
    }

    this.hasVoted = !this.hasVoted;
    this.el.dataset.value = this.value;
    this.display.textContent = this.value;
    this.icon.setAttribute('href', `#${this.hasVoted ? this.iconLike : this.iconDislike}`);
    if (this.hasVoted) {
      this.el.classList.add('button-like_has-voted');
    } else {
      this.el.classList.remove('button-like_has-voted');
    }

    this.dispatchVotedEvent();
  }

  dispatchVotedEvent() {
    const event = new CustomEvent('buttonLike:voted', {
      detail: {
        value: this.value,
        objectId: this.objectId
      }
    });
    this.el.dispatchEvent(event);
  }
}

export { Like };
