import { $ } from './utils/dom.ts'
// import store from './store/index.ts'
import MenuApi, { MenuByCategory } from './api/index.ts'

interface IMenu {
  [menuName: string]: MenuByCategory[]
}

class App {
  menu: IMenu
  currentCategory: string
  constructor() {
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: [],
    }

    this.currentCategory = 'espresso'
  }

  async init() {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory)
  }
  
  async render() {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory)
    const template = this.menu[this.currentCategory].map((menuItem) => {
      return `
        <li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
        <span class="${menuItem.isSoldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${menuItem.name}</span>
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

    $<HTMLUListElement>('#menu-list').innerHTML = template

    this.updateMenuCount()
  }

 async addMenuName() {
    let menuInput = $<HTMLInputElement>('#menu-name')
    if (menuInput.value === '') {
      alert('값을 입력해주세요.')
      return
    }

    const duplicatedItem = this.menu[this.currentCategory].find(menuItem => menuItem.name === menuInput.value)

    if (duplicatedItem) {
      alert('이미 등록된 메뉴입니다. 다시 입력해주세요')
      menuInput.value = ''
      return
    }

    const menuName = menuInput.value as string

    await MenuApi.createMenu(this.currentCategory, menuName)
    this.render()
    menuInput.value = ''
  }

  updateMenuCount() {
    const menuCount = this.menu[this.currentCategory].length
    $<HTMLSpanElement>('.menu-count').innerText = `총 ${menuCount}개`
  }
  
  async updateMenuName(e: Event) {
    const menuList = e.target as HTMLUListElement
    const menuId = menuList.closest('li')!.dataset.menuId
    const $menuName = menuList.closest('li')!.querySelector('.menu-name')! as HTMLInputElement
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText)
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId)
    this.render()
  }

  async removeMenuName(e: Event) {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuList = e.target as HTMLUListElement
      const menuId = menuList.closest('li')!.dataset.menuId
      await MenuApi.deleteMenu(this.currentCategory, menuId)
      this.render()
    }
  }

  async soldOutMenu (e: Event) {
    const menuList = e.target as HTMLUListElement
    const menuId = menuList.closest('li')!.dataset.menuId
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId)
    this.render()
  }

  changeCategory(e: Event) {
    const Nav = e.target as HTMLElement
    const isCategoryButton = Nav.classList.contains('cafe-category-name')
    if (isCategoryButton) {
      const categoryName = Nav.dataset.categoryName as string
      this.currentCategory = categoryName
      $('category-title').innerText = `${Nav.innerText} 메뉴 관리`
      this.render()
    }
  }

  initEventListenrs() {
    $('#menu-list').addEventListener('click', (e: Event) => {
      const menuBtn = e.target as HTMLButtonElement
      if (menuBtn.classList.contains('menu-edit-button')) {
        this.updateMenuName(e)
        return
      }
      
      if (menuBtn.classList.contains('menu-remove-button')) {
        this.removeMenuName(e)
        return
      }
    
      if (menuBtn.classList.contains('menu-sold-out-button')) {
        this.soldOutMenu(e)
        return
      }
    })
  
    $('#menu-form').addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault()
    })
  
    $('#menu-submit-button').addEventListener('click', this.addMenuName)
  
    $('#menu-name').addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key !== 'Enter') {
        return
      }
      this.addMenuName()
    })
  
    $('nav').addEventListener('click', this.changeCategory)
  }
}

const app = new App()
app.init()
