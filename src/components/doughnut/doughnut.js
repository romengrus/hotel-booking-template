class Doughnut {
  constructor(el) {
    const cls = Doughnut.getBaseCSSClass();
    this.el = el;
    this.chartData = JSON.parse(this.el.getAttribute('data-chart-data'));
    this.segments = el.querySelectorAll(`${cls}__segment`);
    this.labels = el.querySelectorAll(`${cls}__label`);
    this.header = el.querySelector(`${cls}__header`);
    this.total = this.chartData.map(v => v.value).reduce((a, b) => a + b, 0);
    this.init();
  }

  static getBaseCSSClass() {
    return '.doughnut';
  }

  init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.labels.forEach(label => {
      label.addEventListener('mouseover', e => this._handleLabelHover(e));
      label.addEventListener('mouseout', e => this._handleLabelBlur(e));
    });
  }

  _handleLabelBlur() {
    this.segments.forEach(segment => segment.classList.remove('doughnut__segment_active'));
    this.labels.forEach(label => label.classList.remove('doughnut__label_active'));
    this.header.textContent = this.total;
  }

  _handleLabelHover(e) {
    const currentLabel = e.target;
    const { segmentIndex } = currentLabel.dataset;
    const numVotes = this.chartData[segmentIndex].value;
    const activeSegment = document.getElementById(`doughnut__segment-${segmentIndex}`);

    this.segments.forEach(segment => segment.classList.remove('doughnut__segment_active'));
    this.labels.forEach(label => label.classList.remove('doughnut__label_active'));

    activeSegment.classList.add('doughnut__segment_active');
    currentLabel.classList.add('doughnut__label_active');
    this.header.textContent = numVotes;
  }
}

export { Doughnut };
