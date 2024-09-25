console.log('hello');

const handleShowNaviBtn = () => {
  const navi = document.querySelector('.navigator');
  navi.classList.toggle('active');
}
  
const naviOpenBtn = document.querySelector('.openNaviBtn');
const naviCloseBtn = document.querySelector('.closeNaviBtn');
naviOpenBtn.addEventListener('click', handleShowNaviBtn);
naviCloseBtn.addEventListener('click', handleShowNaviBtn)