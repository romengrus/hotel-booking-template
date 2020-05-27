import IMask from 'imask';

class Mask {
  constructor(el) {
    this.el = el;

    this.init();
  }

  init() {
    this.mask = IMask(this.input, {
      mask: Date,
      pattern: this.input.dataset.dateFormat || 'd.m.Y',
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2999, maxLength: 4 }
      }
    });
  }
}

export { Mask };
