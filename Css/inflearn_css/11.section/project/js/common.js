const menuBtn = document.querySelector('.btn_nav')

menuBtn.addEventListener('click', () => {
  const lnb = document.querySelector('#header .lnb')
  lnb.classList.toggle('hide')
})
