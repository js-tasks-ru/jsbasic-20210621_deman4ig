import createElement from '../../assets/lib/create-element.js';

function generateSliderHTML({steps, value}) {
  const ribbonSteps = [];

  for (let i = 0; i < steps; i += 1) {
    ribbonSteps.push(document.createElement('span'));
  }

  return `
    <div class="slider">
        <div class="slider__thumb">
            <span class="slider__value">${value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
            ${ribbonSteps.map((step, index) => {
    if (index === value) {
      step.classList.add('slider__step-active');
    }
    return step.outerHTML;
  }).join('')}
        </div>
    </div>
  `;
}

export default class StepSlider {
  _slider = null;
  _steps = null;
  _value = 0;
  _segments = null;

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

  get _sliderItems() {
    return this._slider.querySelectorAll('.slider__steps span');
  }

  set _sliderValue(value) {
    if (value === this._value) {
      return;
    }

    let items = this._sliderItems;

    items[this._value].classList.remove('slider__step-active');

    this._value = value;

    items[this._value].classList.add('slider__step-active');
    this._sliderValue.innerText = this._value;
  }

  _calcSliderPercentage() {
    return `${this._value / this._segments * 100}%`;
  }

  _setSliderPosition = (event) => {
    let target = event.currentTarget;
    let selectedValue;

    let elementWidth = target.offsetWidth;
    let elementClickPosition = event.clientX - target.getBoundingClientRect().left;

    selectedValue = Math.round(elementClickPosition / elementWidth * this._segments);

    this._sliderValue = selectedValue;
    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();

    target.dispatchEvent(new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true,
    }));
  };

  _render() {
    this._slider = createElement(generateSliderHTML({steps: this._steps, value: this._value}));

    this._slider.addEventListener('click', this._setSliderPosition);

    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();
  }

  get elem() {
    return this._slider;
  }
}
