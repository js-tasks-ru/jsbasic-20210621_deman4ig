import createElement from '../../assets/lib/create-element.js';

function generateSliderHTML({ steps, value }) {
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

  constructor({ steps, value = 0 }) {
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

  _setSliderPosition = (event) => {
    let target = event.currentTarget;

    let elementWidth = target.offsetWidth;
    let elementClickPosition = event.clientX - target.getBoundingClientRect().left;

    this._value = Math.round(elementClickPosition / elementWidth * this._segments);


    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();

    if (Number(this._sliderValue.innerText) !== this._value) {
      this._sliderValue = this._value;
    }

    target.dispatchEvent(new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true,
    }));
  }

  _render() {
    this._slider = createElement(generateSliderHTML({ steps: this._steps, value: this._value}));

    this._slider.addEventListener('click', this._setSliderPosition);

    this._thumb.style.left = this._calcSliderPercentage();
    this._progressBar.style.width = this._calcSliderPercentage();
  }

  get elem() {
    return this._slider;
  }
}
