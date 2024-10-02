class Slider {
  constructor(sliderContainer, sliderTrack, sliderActive, sliderDesc) {
    this.container = document.querySelector(sliderContainer);
    this.track = document.querySelector(sliderTrack);
    this.active = document.querySelector(sliderActive);
    this.desc = document.querySelector(sliderDesc);

    this.init();
  }

  init() {
    this.container.addEventListener('click', (event) => {
      this.handleSliderClick(event);
    });
  }

  calculatePercent(clientX) {
    const trackRect = this.track.getBoundingClientRect();
    const trackWidth = this.track.clientWidth;
    const percent = Math.round((clientX - trackRect.left) / trackWidth * 100);
    return Math.max(0, Math.min(percent, 100));
  }

  handleSliderClick(event) {
    const clickedX = event.clientX;
    const percent = this.calculatePercent(clickedX);
    this.active.style.width = `${percent}%`;
    this.desc.textContent = `${percent}%`;
  }
}
const mySlider = new Slider('.sliderContainer', '.sliderTrack', '.sliderActive', '.sliderDesc');
