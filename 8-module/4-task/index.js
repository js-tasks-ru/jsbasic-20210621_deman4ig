import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import formatPrice from '../../assets/lib/format-price.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || !product) {
      return;
    }

    const index = this.cartItems.findIndex(item => item.product.id === product.id);

    if (index === -1) {
      this.cartItems.push({product: product, count: 1});
    } else {
      this.cartItems[index].count += 1;
    }

    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    this.cartItems.map(cartItem => {
      if (cartItem.product.id === productId) {
        cartItem.count += amount;
      }
    });

    this.cartItems = this.cartItems.filter(cartItem => cartItem.count > 0);
  }

  isEmpty() {
    return Boolean(!this.cartItems.length);
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + (item.count * item.product.price), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  onProductControlClick = (event) => {
    const btn = event.target.closest('button');

    if (!btn || !btn.classList.contains('cart-counter__button')) {
      return;
    }

    const product = btn.closest('.cart-product');
    const productId = product.dataset.productId;

    if (btn.classList.contains('cart-counter__button_minus')) {
      this.updateProductCount(productId, -1);
    } else {
      this.updateProductCount(productId, 1);
    }

    if (this.isEmpty()) {
      this.modal.close();
    }

    this.onProductUpdate(productId);
  };

  renderModal() {
    this.modal = new Modal();
    const modalBody = document.createElement('div');

    this.cartItems.map(cartItem => modalBody.append(this.renderProduct(cartItem.product, cartItem.count)));
    modalBody.append(this.renderOrderForm());
    modalBody.addEventListener('click', this.onProductControlClick);

    modalBody.querySelector('.cart-form').onsubmit = (event) => this.onSubmit(event);

    this.modal.setTitle('Your order');
    this.modal.setBody(modalBody);
    this.modal.open();
  }

  onProductUpdate(productId) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    const modal = document.querySelector('.modal');
    const cartTotalPrice = modal.querySelector('.cart-buttons__info-price');
    const [product] = this.cartItems.filter(cartItem => cartItem.product.id === productId);

    if (!product) {
      modal.querySelector(`[data-product-id="${productId}"]`).remove();
      return;
    }

    const {product: {price: price}, count} = product;
    const cartItemCount = modal.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    const cartItemPrice = modal.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

    cartTotalPrice.innerHTML = formatPrice(this.getTotalPrice());
    cartItemCount.innerHTML = count;
    cartItemPrice.innerHTML = formatPrice(price * count);
  }

  async onSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('.cart-form');
    form.querySelector('button[type="submit"]').classList.add('is-loading');

    const formData = new FormData(form);
    formData.append('order', JSON.stringify(this.cartItems));

    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      this.cartItems = [];
      this.modal.setTitle('Success!');
      this.modal.setBody(createElement(`<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>`));
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

