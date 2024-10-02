const container = document.querySelector('.sliderContainer');
const track = document.querySelector('.sliderTrack');
const active = document.querySelector('.sliderActive');
const desc = document.querySelector('.sliderDesc');
const trackMargin = 25;

container.addEventListener('click', (event) => {
  let clickedX = event.clientX;
  let trackRect = track.getBoundingClientRect();
  let trackWidth = track.clientWidth;
  let percent = Math.round((clickedX - trackRect.left) / trackWidth * 100);
  percent = Math.max(0, Math.min(100, percent));
  active.style.width = `${percent}%`;
  desc.innerHTML = `${percent}%`;
})