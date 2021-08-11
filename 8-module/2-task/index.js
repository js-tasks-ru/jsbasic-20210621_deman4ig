import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

function generateInnerGrid(products) {
  const innerGrid = document.createElement('div');
  innerGrid.classList.add('products-grid__inner');

  products.map(product => innerGrid.append(new ProductCard(product).elem));

  return innerGrid;
}

export default class ProductGrid {
  _elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  get elem() {
    return this._elem;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const gridElements = this._elem.querySelector('.products-grid__inner');
    let filteredProducts = this.products;

    if (this.filters.noNuts) {
      filteredProducts = filteredProducts.filter(product => product.nuts === !this.filters.noNuts || product.nuts === undefined);
    }

    if (this.filters.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(product => product.vegeterian === this.filters.vegeterianOnly);
    }

    if (this.filters.maxSpiciness) {
      filteredProducts = filteredProducts.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      filteredProducts = filteredProducts.filter(product => product.category === this.filters.category);
    }

    gridElements.replaceWith(generateInnerGrid(filteredProducts));
  }

  render() {
    this._elem = document.createElement('div');
    this._elem.classList.add('products-grid');
    this._elem.append(generateInnerGrid(this.products));
  }
}
