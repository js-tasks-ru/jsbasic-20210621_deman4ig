import createElement from '../../assets/lib/create-element.js';

function generateModalHTML() {
  return `
    <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
            <div class="modal__header">
                <button class="modal__close" type="button">
                    <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
                </button>
                <h3 class="modal__title"></h3>
            </div>
            <div class="modal__body"></div>
        </div>
    </div>
  `;
}

export default class Modal {
  _modal;

  constructor() {
    this._modal = createElement(generateModalHTML());
  }

  get _title() {
    return this._modal.querySelector('.modal__title');
  }

  get _body() {
    return this._modal.querySelector('.modal__body');
  }

  get _closeBtn() {
    return this._modal.querySelector('.modal__close');
  }

  _closeOnEsc = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  setTitle(title) {
    this._title.innerHTML = title;
  }

  setBody(body) {
    this._body.innerHTML = null;
    this._body.append(body);
  }

  open = () => {
    if (document.body.classList.contains('is-modal-open')) {
      return;
    }

    document.body.classList.add('is-modal-open');
    document.body.append(this._modal);

    this._closeBtn.addEventListener('click', this.close, { once: true });
    document.body.addEventListener('keydown', this._closeOnEsc);
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    document.body.removeEventListener('keydown', this._closeOnEsc);
    this._modal.remove();
  }
}
