const $ = (selector) => document.querySelector(selector)
const navMenu = $('#nav-menu')
const navMenuList = $('#nav-menu-list')
const togglNavMenu = () => {
  const isOpen = navMenuList.classList.contains('block')
  const list = [ ...navMenuList.children ]
  const openNavMenuClassList = ['block', 'absolute', 'right-0', 'sm:top-20', 'md:top-24']
  const openLiClassList = ['sm:flex', 'sm:items-center', 'sm:justify-center', 'sm:w-full', 'md:w-80', 'sm:h-12', 'sm:bg-gray-300', 'sm:border', 'sm:border-gray-50', 'sm:hover:bg-gray-100' ]
  if (!isOpen) {
    navMenuList.classList.remove('hidden')
    list.forEach(li => li.classList.add(...openLiClassList))
    navMenuList.classList.add(...openNavMenuClassList)
  } else {
    navMenuList.classList.remove(...openNavMenuClassList)
    list.forEach(li => li.classList.remove(...openLiClassList))
    navMenuList.classList.add('hidden')
  }
}
navMenu.addEventListener('click', togglNavMenu)