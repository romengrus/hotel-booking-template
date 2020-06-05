import { factory } from '../../scripts/factory';

class Doughnut {
  constructor(el) {
    const id = Doughnut.getID();
    this.el = el;
    this.chartData = JSON.parse(this.el.getAttribute(`data-chart-data`));
    this.segmentEls = el.querySelectorAll(`[data-${id}-segment]`);
    this.labelEls = el.querySelectorAll(`[data-${id}-label]`);
    this.headerEl = el.querySelector(`[data-${id}-header]`);
    this.total = this.chartData.map(v => v.value).reduce((a, b) => a + b, 0);
    this.init();
  }

  static getID() {
    return 'doughnut';
  }

  init() {
    this.bindEventHandlers();
    this.attachEventHandlers();
  }

  bindEventHandlers() {
    this.handleLabelHover = this.handleLabelHover.bind(this);
    this.handleLabelBlur = this.handleLabelBlur.bind(this);
  }

  attachEventHandlers() {
    this.labelEls.forEach(label => {
      label.addEventListener('mouseover', this.handleLabelHover);
      label.addEventListener('mouseout', this.handleLabelBlur);
    });
  }

  handleLabelBlur() {
    this.segmentEls.forEach(segment => segment.classList.remove('doughnut__segment_active'));
    this.labelEls.forEach(label => label.classList.remove('doughnut__label_active'));
    this.headerEl.textContent = this.total;
  }

  handleLabelHover(e) {
    const currentLabel = e.target;
    const { segmentIndex } = currentLabel.dataset;
    const numVotes = this.chartData[segmentIndex].value;
    const activeSegment = document.getElementById(`doughnut__segment-${segmentIndex}`);

    this.segmentEls.forEach(segment => segment.classList.remove('doughnut__segment_active'));
    this.labelEls.forEach(label => label.classList.remove('doughnut__label_active'));

    activeSegment.classList.add('doughnut__segment_active');
    currentLabel.classList.add('doughnut__label_active');
    this.headerEl.textContent = numVotes;
  }
}

factory(Doughnut);

export { Doughnut };
