import createElement from '../../assets/lib/create-element.js';

function generateSliderHTML({steps, value}) {
  const div = document.createElement('div');

  for (let i = 0; i < steps; i += 1) {
    const span = document.createElement('span');

    if (i === value) {
      span.classList.add('slider__step-active');
    }

    div.append(span);
  }

  return `
    <div class="slider">
        <div class="slider__thumb">
            <span class="slider__value">${value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
            ${div.innerHTML}
        </div>
    </div>
  `;
}

export default class StepSlider {
  _slider;
  _steps;
  _value;
  _segments;

  constructor({steps, value = 0}) {
    this._steps = steps;
    this._value = value;
    this._segments = this._steps - 1;

    this._render();
  }

  get _thumb() {
    return this._slider.querySelector('.slider__thumb');
  }

  get _progressBar() {
    return this._slider.querySelector('.slider__progress');
  }

  get _sliderValue() {
    return this._slider.querySelector('.slider__value');
  }

  set _sliderValue(value) {
    let highlightedElement = this._slider.querySelector('.slider__step-active');
    highlightedElement.classList.remove('slider__step-active');
    this._sliderValue.innerText = value;
    this._slider.querySelector(`.slider__steps > span:nth-of-type(${value + 1})`).classList.add('slider__step-active');
  }

  _calcSliderPercentage() {
    return `${this._value / this._segments * 100}%`;
  }

  _onPointerDown = () => {
    this._slider.classList.add('slider_dragging');

    document.addEventListener('pointermove', this._setSliderPosition);
    document.addEventListener('pointerup', this._setFinalPosition);
  };

  _setSliderPosition = (event) => {
    let sliderRect = this._slider.getBoundingClientRect();
    let elementAbsoluteClkPosition = event.clientX - sliderRect.left;
    let elementRelativeClkPosition = elementAbsoluteClkPosition / sliderRect.width;

    if (elementRelativeClkPosition < 0) {
      elementRelativeClkPosition = 0;
    }

    if (elementRelativeClkPosition > 1) {
      elementRelativeClkPosition = 1;
    }

    this._thumb.style.left = `${elementRelativeClkPosition * 100}%`;
    this._progressBar.style.width = `${elementRelativeClkPosition * 100}%`;

    this._value = Math.round(elementRelativeClkPosition * this._segments);

    if (Number(this._sliderValue.innerText) !== this._value) {
      this._sliderValue = this._value;
    }
  };

  _setFinalPosition = () => {
    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();

    this._slider.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this._setSliderPosition);
    document.onpointerup = null;

    this._slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true,
    }));
  };

  _render() {
    this._slider = createElement(generateSliderHTML({steps: this._steps, value: this._value}));

    this._thumb.ondragstart = () => false;

    this._thumb.addEventListener('pointerdown', this._onPointerDown);
    this._slider.addEventListener('click', this._setSliderPosition);
    this._slider.addEventListener('click', this._setFinalPosition);

    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();
  }

  get elem() {
    return this._slider;
  }
}
