console.log('hello');

function debounce(callback, delay = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  }
}

const handleShowNaviBtn = () => {
  const navi = document.querySelector('.navigator');
  navi.classList.toggle('active');
}

const naviOpenBtn = document.querySelector('.openNaviBtn');
const naviCloseBtn = document.querySelector('.closeNaviBtn');
naviOpenBtn.addEventListener('click', handleShowNaviBtn);
naviCloseBtn.addEventListener('click', handleShowNaviBtn)