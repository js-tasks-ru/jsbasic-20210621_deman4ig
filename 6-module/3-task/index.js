import createElement from '../../assets/lib/create-element.js';
import formatPrice from '../../assets/lib/format-price.js';

function generateCarouselWrapper() {
  const div = document.createElement('div');
  div.classList.add('carousel');

  div.innerHTML = `
  <div class='carousel__arrow carousel__arrow_left'>
    <img src='/assets/images/icons/angle-left-icon.svg' alt='icon'>
  </div>
  <div class='carousel__arrow carousel__arrow_right'>
    <img src='/assets/images/icons/angle-icon.svg' alt='icon'>
  </div>
  `;

  return div;
}

function generateCarouselSlide({image, price, name, id}) {
  return `<div class='carousel__slide' data-id="${id}">
      <img src='${image}' class='carousel__img' alt='slide'>
      <div class="carousel__caption">
      <span class='carousel__price'>${price}</span>
      <div class='carousel__title'>${name}</div>
      <button type='button' class='carousel__button'>
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
</div>
    </div>`;
}

class CarouselSlide {
  _container;
  _name;
  _price;
  _image;
  _id;

  constructor(product) {
    this._name = product.name;
    this._price = formatPrice(product.price);
    this._image = this._formatImagePath(product.image);
    this._id = product.id;
    this._container = this._render();
  }

  _formatImagePath = (path) => {
    return `/assets/images/carousel/${path}`;
  };

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
  };

  _render() {
    const div = document.createElement('div');
    div.innerHTML = generateCarouselSlide({image: this._image, price: this._price, name: this._name, id: this._id});

    div.firstElementChild.addEventListener('click', this._onPlsBtnClick);

    return div.firstElementChild;
  }

  get elem() {
    return this._container;
  }
}

export default class Carousel {
  _elem;
  _slidesCount;
  _currentSlide = 0;
  _leftArrow;
  _rightArrow;
  _carouselSlides;

  constructor(slides) {
    this._slides = slides;
    this._slidesCount = slides.length;
    this._elem = this._render();
  }

  _nextSlide = () => {
    if (this._currentSlide < this._slidesCount - 1) {
      this._currentSlide += 1;
      this._carouselSlides.style.transform = `translateX(-${this._currentSlide * this._carouselSlides.offsetWidth}px)`;
      this._leftArrow.style.display = 'flex';
    }

    if (this._currentSlide === this._slidesCount - 1) {
      this._rightArrow.style.display = 'none';
    }
  }

  _previousSlide = () => {
    if (this._currentSlide >= 0) {
      this._currentSlide -= 1;
      this._carouselSlides.style.transform = `translateX(-${this._currentSlide * this._carouselSlides.offsetWidth}px)`;
      this._rightArrow.style.display = 'flex';
    }

    if (this._currentSlide === 0) {
      this._leftArrow.style.display = 'none';
    }
  };

  _render() {
    const carousel = generateCarouselWrapper();

    this._carouselSlides = document.createElement('div');
    this._carouselSlides.classList.add('carousel__inner');
    this._carouselSlides.append(...this._slides.map(slide => {
      return new CarouselSlide(slide).elem;
    }));

    carousel.append(this._carouselSlides);

    this._leftArrow = carousel.querySelector('.carousel__arrow_left');
    this._rightArrow = carousel.querySelector('.carousel__arrow_right');

    this._leftArrow.style.display = 'none';

    this._leftArrow.addEventListener('click', this._previousSlide);
    this._rightArrow.addEventListener('click', this._nextSlide);

    return carousel;
  }

  get elem() {
    return this._elem;
  }
}
