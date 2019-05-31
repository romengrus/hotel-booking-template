/* eslint-disable no-unused-vars */
import path from 'path';
import pug from 'pug';
import { fireEvent } from 'dom-testing-library';
import { DropdownCounter } from '../dropdown-counter';
import { Counter } from '../../counter/counter';

const qs = DropdownCounter.getQuerySelector();
const basedir = global.__BASE_DIR;
const templatePath = path.join(__dirname, 'dropdown-counter.test.pug');
const makeComponent = pug.compileFile(templatePath, { basedir });

describe('Dropdown Counter', () => {
  test('should render', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    expect($el).toBeInTheDocument();
  });

  test('should apply provided modifiers', () => {
    document.body.innerHTML = makeComponent({ props: { mods: ['modifier1', 'modifier2'] } });
    const $el = document.querySelector(qs);
    expect($el).toHaveClass('modifier1', 'modifier2');
  });

  test('should apply provided attributes to alt input', () => {
    document.body.innerHTML = makeComponent({ attributes: { foo: 'bar' } });
    const $el = document.querySelector(qs);
    const $altInput = $el.querySelector('.dropdown-counter__value-alt');
    expect($altInput).toHaveAttribute('foo', 'bar');
  });

  test('displayType should be "total" by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    expect($el).toHaveAttribute('data-display-type', 'total');
    expect(dc.displayType).toBe('total');
  });

  test('should use provided displayType', () => {
    document.body.innerHTML = makeComponent({ props: { displayType: 'concat' } });
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    expect($el).toHaveAttribute('data-display-type', 'concat');
    expect(dc.displayType).toBe('concat');
  });

  test('plurals should be [] by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    expect($el).toHaveAttribute('data-plurals', '[]');
    expect(dc.plurals).toEqual([]);
  });

  test('should use provided plurals', () => {
    const plurals = ['one', 'two', 'three'];
    document.body.innerHTML = makeComponent({ props: { plurals } });
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    expect($el).toHaveAttribute('data-plurals');
    expect(dc.plurals).toEqual(plurals);
  });

  test('should not render any counters by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $counters = $el.querySelectorAll('.counter');
    expect($counters.length).toBe(0);
  });

  test('should render counters from provided counter props', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален']
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей']
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат']
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    expect($counters.length).toBe(3);
  });

  test('should use provided counters props to set initial value', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom',
        value: 1
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed',
        value: 2
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom',
        value: 1
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    expect(dc.countersProps).toEqual(counters);
    expect(Array.from(dc._model)).toEqual([
      ['bedroom', { numValue: 1, strValue: '1 спальня' }],
      ['bed', { numValue: 2, strValue: '2 кровати' }],
      ['bathroom', { numValue: 1, strValue: '1 ванная комната' }]
    ]);
  });

  test('should have hidden input for storing value in json', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const $input = $el.querySelector('.dropdown-counter__value');
    expect($input).toBeInTheDocument();
    expect($input).toHaveAttribute('hidden');
    expect(dc.$input).not.toBe(undefined);
  });

  test('should have visible input to display value to the user', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const $input = $el.querySelector('.dropdown-counter__value-alt');
    expect($input).toBeInTheDocument();
    expect($input).not.toHaveAttribute('hidden');
    expect(dc.$inputAlt).not.toBe(undefined);
  });

  test('should have "ok" & "reset" buttons', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const $ok = $el.querySelector('.dropdown-counter__ok');
    const $reset = $el.querySelector('.dropdown-counter__reset');
    expect($ok).toBeInTheDocument();
    expect(dc.$ok).not.toBe(undefined);
    expect($reset).toBeInTheDocument();
    expect(dc.$reset).not.toBe(undefined);
  });

  test('should have toggler icon in header', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const $toggler = $el.querySelector('.dropdown-counter__toggler');
    expect($toggler).toBeInTheDocument();
    expect(dc.$toggler).not.toBe(undefined);
  });

  test('should update hidden input appropriately', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom',
        value: 1
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed',
        value: 2
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom',
        value: 1
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const model = [
      ['bedroom', { numValue: 1, strValue: '1 спальня' }],
      ['bed', { numValue: 2, strValue: '2 кровати' }],
      ['bathroom', { numValue: 1, strValue: '1 ванная комната' }]
    ];
    const $input = $el.querySelector('.dropdown-counter__value');
    expect($input.value).toEqual(JSON.stringify(model));
  });

  test('should update visible input appropriately', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom',
        value: 1
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed',
        value: 2
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom',
        value: 1
      }
    ];
    // displayType = 'total', plurals = []
    document.body.innerHTML = makeComponent({ props: { counters } });
    let $el = document.querySelector(qs);
    let dc = new DropdownCounter($el);
    let $inputAlt = $el.querySelector('.dropdown-counter__value-alt');
    expect($inputAlt.value).toEqual('4');

    // displayType = 'total', plurals = ['удобство', 'удобства', 'удобства']
    document.body.innerHTML = makeComponent({
      props: { counters, plurals: ['удобство', 'удобства', 'удобства'] }
    });
    $el = document.querySelector(qs);
    dc = new DropdownCounter($el);
    $inputAlt = $el.querySelector('.dropdown-counter__value-alt');
    expect($inputAlt.value).toEqual('4 удобства');

    // displayType = 'concat', plurals = []
    document.body.innerHTML = makeComponent({
      props: { counters, displayType: 'concat' }
    });
    $el = document.querySelector(qs);
    dc = new DropdownCounter($el);
    $inputAlt = $el.querySelector('.dropdown-counter__value-alt');
    expect($inputAlt.value).toEqual('1 спальня, 2 кровати, 1 ванная комната');
  });

  test('should update values on any counter change', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom'
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed'
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom'
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters, displayType: 'concat' } });
    const $el = document.querySelector(qs);
    const dc = new DropdownCounter($el);
    const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    $counters.forEach($counter => new Counter($counter));
    const $input = $el.querySelector('.dropdown-counter__value');
    const $inputAlt = $el.querySelector('.dropdown-counter__value-alt');
    const model = [
      ['bedroom', { numValue: 0, strValue: '0 спален' }],
      ['bed', { numValue: 0, strValue: '0 кроватей' }],
      ['bathroom', { numValue: 0, strValue: '0 ванных комнат' }]
    ];
    const spyOnUpdateModel = jest.spyOn(dc, 'updateModel');

    // initial state
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('');

    // bedroom counter increase
    const $incBedrooms = $counters.item(0).querySelector('.counter__button-inc');
    fireEvent.click($incBedrooms);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[0][1].numValue = 1;
    model[0][1].strValue = '1 спальня';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня');

    // bed counter increase
    const $incBeds = $counters.item(1).querySelector('.counter__button-inc');
    fireEvent.click($incBeds);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[1][1].numValue = 1;
    model[1][1].strValue = '1 кровать';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня, 1 кровать');

    // bathroom counter increase
    const $incBathrooms = $counters.item(2).querySelector('.counter__button-inc');
    fireEvent.click($incBathrooms);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[2][1].numValue = 1;
    model[2][1].strValue = '1 ванная комната';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня, 1 кровать, 1 ванная комната');

    // custom value increase
    fireEvent.click($incBedrooms);
    fireEvent.click($incBeds);
    fireEvent.click($incBeds);
    fireEvent.click($incBathrooms);
    fireEvent.click($incBathrooms);
    model[0][1].numValue = 2;
    model[0][1].strValue = '2 спальни';
    model[1][1].numValue = 3;
    model[1][1].strValue = '3 кровати';
    model[2][1].numValue = 3;
    model[2][1].strValue = '3 ванные комнаты';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('2 спальни, 3 кровати, 3 ванные комнаты');

    // bedroom counter decrease
    const $decBedrooms = $counters.item(0).querySelector('.counter__button-dec');
    fireEvent.click($decBedrooms);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[0][1].numValue = 1;
    model[0][1].strValue = '1 спальня';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня, 3 кровати, 3 ванные комнаты');

    // bed counter decrease
    const $decBeds = $counters.item(1).querySelector('.counter__button-dec');
    fireEvent.click($decBeds);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[1][1].numValue = 2;
    model[1][1].strValue = '2 кровати';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня, 2 кровати, 3 ванные комнаты');

    // bathroom counter decrease
    const $decBathrooms = $counters.item(2).querySelector('.counter__button-dec');
    fireEvent.click($decBathrooms);
    expect(spyOnUpdateModel).toHaveBeenCalled();
    model[2][1].numValue = 2;
    model[2][1].strValue = '2 ванные комнаты';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('1 спальня, 2 кровати, 2 ванные комнаты');

    // custom value decrease
    fireEvent.click($decBedrooms);
    fireEvent.click($decBeds);
    fireEvent.click($decBeds);
    fireEvent.click($decBathrooms);
    fireEvent.click($decBathrooms);
    fireEvent.click($decBathrooms);
    model[0][1].numValue = 0;
    model[0][1].strValue = '0 спален';
    model[1][1].numValue = 0;
    model[1][1].strValue = '0 кроватей';
    model[2][1].numValue = 0;
    model[2][1].strValue = '0 ванных комнат';
    expect($input.value).toBe(JSON.stringify(model));
    expect($inputAlt.value).toBe('');
  });

  test('should be collapsed by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $body = $el.querySelector('.dropdown-counter__body');
    expect($body).toHaveClass('dropdown-counter__body_collapsed');
  });

  test('should be expanded if isCollapsed = false', () => {
    document.body.innerHTML = makeComponent({ props: { isCollapsed: false } });
    const $el = document.querySelector(qs);
    const $body = $el.querySelector('.dropdown-counter__body');
    expect($body).not.toHaveClass('dropdown-counter__body_collapsed');
  });

  test('should expand/collapse on toggler click', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $toggler = $el.querySelector('.dropdown-counter__toggler');
    const $body = $el.querySelector('.dropdown-counter__body');
    const $header = $el.querySelector('.dropdown-counter__header');
    const dc = new DropdownCounter($el);

    expect($body).toHaveClass('dropdown-counter__body_collapsed');
    expect($header).toHaveClass('dropdown-counter__header_collapsed');
    expect($toggler).toHaveClass('dropdown-counter__toggler_collapsed');

    fireEvent.click($toggler);

    expect($body).not.toHaveClass('dropdown-counter__body_collapsed');
    expect($header).not.toHaveClass('dropdown-counter__header_collapsed');
    expect($toggler).not.toHaveClass('dropdown-counter__toggler_collapsed');

    fireEvent.click($toggler);

    expect($body).toHaveClass('dropdown-counter__body_collapsed');
    expect($header).toHaveClass('dropdown-counter__header_collapsed');
    expect($toggler).toHaveClass('dropdown-counter__toggler_collapsed');
  });

  test('actions panel should be hidden by default', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $ap = $el.querySelector('.dropdown-counter__actions-panel');
    expect($ap).toHaveClass('dropdown-counter__actions-panel_hidden');
  });

  test('actions panel should be visible if value changed', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom'
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed'
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom'
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const $ap = $el.querySelector('.dropdown-counter__actions-panel');
    const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    const dc = new DropdownCounter($el);
    $counters.forEach($counter => new Counter($counter));

    expect($ap).toHaveClass('dropdown-counter__actions-panel_hidden');

    const $incBedrooms = $counters.item(0).querySelector('.counter__button-inc');
    fireEvent.click($incBedrooms);

    expect($ap).not.toHaveClass('dropdown-counter__actions-panel_hidden');
  });

  test('"Reset" button should be visible only if any counter has non zero value', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom'
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed'
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom'
      }
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const $reset = $el.querySelector('.dropdown-counter__reset');
    const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    const dc = new DropdownCounter($el);
    $counters.forEach($counter => new Counter($counter));

    expect($reset).toHaveClass('dropdown-counter__reset_hidden');

    const $incBedrooms = $counters.item(0).querySelector('.counter__button-inc');
    fireEvent.click($incBedrooms);

    expect($reset).not.toHaveClass('dropdown-counter__reset_hidden');
  });

  test('should clear counters on "Reset" button click', () => {
    const counters = [
      {
        label: 'спальни',
        plurals: ['спальня', 'спальни', 'спален'],
        objectId: 'bedroom',
        value: 1
      },
      {
        label: 'кровати',
        plurals: ['кровать', 'кровати', 'кроватей'],
        objectId: 'bed',
        value: 2
      },
      {
        label: 'ванные комнаты',
        plurals: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        objectId: 'bathroom',
        value: 1
      }
    ];
    let model = [
      ['bedroom', { numValue: 1, strValue: '1 спальня' }],
      ['bed', { numValue: 2, strValue: '2 кровати' }],
      ['bathroom', { numValue: 1, strValue: '1 ванная комната' }]
    ];
    document.body.innerHTML = makeComponent({ props: { counters } });
    const $el = document.querySelector(qs);
    const $reset = $el.querySelector('.dropdown-counter__reset');
    const dc = new DropdownCounter($el);

    expect(Array.from(dc._model)).toEqual(model);

    fireEvent.click($reset);

    model = [
      ['bedroom', { numValue: 0, strValue: '0 спален' }],
      ['bed', { numValue: 0, strValue: '0 кроватей' }],
      ['bathroom', { numValue: 0, strValue: '0 ванных комнат' }]
    ];

    expect(Array.from(dc._model)).toEqual(model);
  });

  test('should collapse on "ok" click', () => {
    document.body.innerHTML = makeComponent({ props: { isCollapsed: false } });
    const $el = document.querySelector(qs);
    const $ok = $el.querySelector('.dropdown-counter__ok');
    const $body = $el.querySelector('.dropdown-counter__body');
    // const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    const dc = new DropdownCounter($el);

    expect($body).not.toHaveClass('dropdown-counter__body_collapsed');
    fireEvent.click($ok);
    expect($body).toHaveClass('dropdown-counter__body_collapsed');
  });

  test('should expand on alt input focus', () => {
    document.body.innerHTML = makeComponent();
    const $el = document.querySelector(qs);
    const $altInput = $el.querySelector('.dropdown-counter__value-alt');
    const $body = $el.querySelector('.dropdown-counter__body');
    // const $counters = $el.querySelectorAll('.dropdown-counter__counter');
    const dc = new DropdownCounter($el);

    expect($body).toHaveClass('dropdown-counter__body_collapsed');
    fireEvent.focus($altInput);
    expect($body).not.toHaveClass('dropdown-counter__body_collapsed');
  });
});
