import { $ } from './utils/dom.js'
import store from './store/index.js'

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso'
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage()
    }
    render()
    initEventListenrs()
  }

  const render = () => {
    const template = this.menu[this.currentCategory].map((menuItem, idx) => {
      return `
        <li data-menu-id="${idx}" class="menu-list-item d-flex items-center py-2">
        <span class="${menuItem.soldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${menuItem.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
        삭제
        </button>
        </li>
      `
    })
    .join('')

    $('#menu-list').innerHTML = template

    updateMenuCount()
  }

  const addMenuName = () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요.')
      return
    }
    
    const menuName = $('#menu-name').value
    this.menu[this.currentCategory].push({ name: menuName })
    store.setLocalStorage(this.menu)
    render()
    $('#menu-name').value = ''
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length
    $('.menu-count').innerText = `총 ${menuCount}개`
  }
  
  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    this.menu[this.currentCategory][menuId].name = updatedMenuName
    store.setLocalStorage(this.menu)
    render()
  }

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId
      this.menu[this.currentCategory].splice(menuId, 1)
      store.setLocalStorage(this.menu)
      render()
    }
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)
    render()
  }

  const initEventListenrs = () => {
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e)
        return
      }
      
      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e)
        return
      }
    
      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e)
        return
      }
    })
  
    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault()
    })
  
    $('#menu-submit-button').addEventListener('click', addMenuName)
  
    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return
      }
      addMenuName()
    })
  
    $('nav').addEventListener('click', (e) => {
      const isCategoryButton = e.target.classList.contains('cafe-category-name')
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName
        this.currentCategory = categoryName
        $('category-title').innerText = `${e.target.innerText} 메뉴 관리`
        render()
      }
    })
  }
}

const app = new App()
app.init()
