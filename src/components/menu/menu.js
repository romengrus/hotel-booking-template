import { not } from '../../scripts/utils';
import { factory } from '../../scripts/factory';

class Menu {
  constructor(el) {
    this.id = Menu.getID();
    this.el = el;
    this.menuItems = el.querySelectorAll(`[data-${this.id}-item]`);
    this.init();
  }

  static getID() {
    return 'menu';
  }

  init() {
    this.bindEventListeners();
    this.attachEventHandlers();
  }

  bindEventListeners() {
    this.showSubmenu = this.showSubmenu.bind(this);
    this.hideSubmenu = this.hideSubmenu.bind(this);
  }

  attachEventHandlers() {
    this.menuItems.forEach(item => {
      item.addEventListener('mouseenter', this.showSubmenu);
      item.addEventListener('mouseleave', this.hideSubmenu);
      item.addEventListener('focusin', this.showSubmenu);
      item.addEventListener('focusout', this.hideSubmenu);
    });
  }

  showSubmenu(e) {
    const currentItem = e.currentTarget;
    const hasSubmenu = !!currentItem.querySelector([`[data-${this.id}-submenu]`]);

    if (not(hasSubmenu)) return;

    // hide other submenus
    [...this.menuItems]
      .filter(item => item !== currentItem)
      .forEach(item => item.classList.remove('menu__item_is-active'));

    // toggle the state of current sub menu
    currentItem.classList.add('menu__item_is-active');
  }

  hideSubmenu(e) {
    const currentItem = e.currentTarget;

    // toggle the state of current sub menu
    currentItem.classList.add('menu__item_is-fading');

    // remove modifiers after delay
    setTimeout(() => {
      currentItem.classList.remove('menu__item_is-active');
      currentItem.classList.remove('menu__item_is-fading');
    }, 350);
  }
}

factory(Menu);

export { Menu };
