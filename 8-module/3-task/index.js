export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

