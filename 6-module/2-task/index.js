import createElement from '../../assets/lib/create-element.js';
import formatPrice from '../../assets/lib/format-price.js';

export default class ProductCard {
  _name;
  _price;
  _category;
  _image;
  _id;
  _container;

  constructor(product) {
    this._name = product.name;
    this._price = formatPrice(product.price);
    this._category = product.category;
    this._image = this._formatImagePath(product.image);
    this._id = product.id;
    this._container = this._render();
  }

  _formatImagePath = (path) => {
    return `/assets/images/products/${path}`;
  };

  _render() {
    const div = document.createElement('div');
    div.innerHTML = productCardTemplate({
      image: this._image,
      price: this._price,
      name: this._name,
    });

    div.firstElementChild.addEventListener('click', this._onPlsBtnClick);

    return div.firstElementChild;
  }

  _onPlsBtnClick = (event) => {
    const btn = event.target.closest('BUTTON');
    if (!btn) {
      return false;
    }

    const productAdd = new CustomEvent('product-add', {
      detail: this._id,
      bubbles: true,
    });

    event.target.dispatchEvent(productAdd);
  }

  get elem() {
    return this._container;
  }
}

function productCardTemplate({image, price, name}) {
  return `<div class='card'>
    <div class='card__top'>
      <img src='${image}' class='card__image' alt='product'>
      <span class='card__price'>${price}</span>
    </div>
    <div class='card__body'>
      <div class='card__title'>${name}</div>
      <button type='button' class='card__button'>
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>`;
}
