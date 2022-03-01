const $ = (selector) => document.querySelector(selector)
const navMenu = $('#nav-menu')
const navMenuList = $('#nav-menu-list')
const togglNavMenu = () => {
  const isOpen = navMenuList.classList.contains('block')
  const list = [ ...navMenuList.children ]
  const openNavMenuClassList = ['block', 'absolute', 'right-0', 'top-24']
  const openLiClassList = ['md:flex', 'md:items-center', 'md:justify-center', 'md:w-80', 'md:h-12', 'md:bg-gray-300', 'md:border', 'md:border-gray-50', 'md:hover:bg-gray-100' ]
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