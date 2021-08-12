import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  updatePosition() {

    if (!this.elem.offsetHeight) {
      return;
    }

    const container = document.querySelector('.container').firstElementChild;

    const isMobile = () => {
      return document.documentElement.clientWidth < 767;
    };

    let cartPosition = `${Math.min(
      container.getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10,
    )}px`;

    if (pageYOffset > 50 && !isMobile()) {
      Object.assign(this.elem.style, {
        zIndex: 100,
        position: 'fixed',
        left: cartPosition,
        right: '10px',
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        left: '',
        zIndex: '',
        right: '',
      });
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }
}
