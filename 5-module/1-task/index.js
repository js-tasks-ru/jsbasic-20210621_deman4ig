function hideSelf() {
  const btn = document.querySelector('.hide-self-button');
  const hiseSelf = (event) => event.target.hidden = true;

  btn.addEventListener('click', hiseSelf);
}
