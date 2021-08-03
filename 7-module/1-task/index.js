import createElement from '../../assets/lib/create-element.js';

function generateRibbonHTML(items) {
  return `
    <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">${items.map(item => generateRibbonItemHTML(item)).join('')}</nav>
        <button class="ribbon__arrow ribbon__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    </div>
  `;
}

function generateRibbonItemHTML(item) {
  return `
    <a class="ribbon__item" href="#" data-id="${item.id}">${item.name}</a>
  `;
}

export default class RibbonMenu {
  _ribbon = null;
  _leftArrow = null;
  _rightArrow = null;
  _ribbonInner = null;

  constructor(categories) {
    this.categories = categories;
    this._render();
  }

  _hideArrow(arrow) {
    arrow.classList.remove('ribbon__arrow_visible');
  }

  _showArrow(arrow) {
    arrow.classList.add('ribbon__arrow_visible');
  }

  _toggleActive(item) {
    item.classList.toggle('ribbon__item_active');
  }

  _scroll = (event) => {
    if (event.target === this._rightArrow) {
      this._ribbonInner.scrollBy(350, 0);
      this._showArrow(this._leftArrow);
    }

    if (event.target === this._leftArrow) {
      this._ribbonInner.scrollBy(-350, 0);
      this._showArrow(this._rightArrow);
    }

    setTimeout(() => {
      const scrollRight = this._ribbonInner.scrollWidth - this._ribbonInner.scrollLeft - this._ribbonInner.offsetWidth;

      if (this._ribbonInner.scrollLeft < 1) {
        this._hideArrow(this._leftArrow);
      }
      if (scrollRight < 1) {
        this._hideArrow(this._rightArrow);
      }
    }, 600);
  }

  _categoryClick = (event) => {
    let currentActive = this._ribbonInner.querySelector('.ribbon__item_active');

    if (event.target === currentActive) {
      return;
    }

    this._toggleActive(currentActive);
    this._toggleActive(event.target);

    event.target.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true
    }));
  }

  _render() {
    this._ribbon = createElement(generateRibbonHTML(this.categories));
    this._ribbonInner = this._ribbon.querySelector('.ribbon__inner');
    this._leftArrow = this._ribbon.querySelector('.ribbon__arrow_left');
    this._rightArrow = this._ribbon.querySelector('.ribbon__arrow_right');

    this._ribbon.querySelector('.ribbon__item').classList.add('ribbon__item_active');
    this._showArrow(this._rightArrow);

    this._leftArrow.addEventListener('click', this._scroll);
    this._rightArrow.addEventListener('click', this._scroll);
    this._ribbonInner.addEventListener('click', this._categoryClick);
  }

  get elem() {
    return this._ribbon;
  }
}
