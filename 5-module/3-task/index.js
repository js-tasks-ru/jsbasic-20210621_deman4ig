function initCarousel() {
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const slides = document.querySelector('.carousel__inner');
  const slideCount = slides.querySelectorAll('.carousel__slide').length;

  const slideWidth = slides.offsetWidth;
  let currentSlide = 0;
  leftArrow.style.display = 'none';

  const nextSlide = () => {
    if (currentSlide < slideCount - 1) {
      currentSlide += 1;
      slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      leftArrow.style.display = 'flex';
    }

    if (currentSlide === slideCount - 1) {
      rightArrow.style.display = 'none';
    }
  };

  const previousSlide = () => {
    if (currentSlide >= 0) {
      currentSlide -= 1;
      slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      rightArrow.style.display = 'flex';
    }

    if (currentSlide === 0) {
      leftArrow.style.display = 'none';
    }
  };

  leftArrow.addEventListener('click', previousSlide);
  rightArrow.addEventListener('click', nextSlide);
}
