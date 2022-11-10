const BASE_URL = "http://localhost:3000/api"

interface IHTTP_METHOD {
  [method: string]: <T>(data?: T) => RequestInit
}

const HTTP_METHOD: IHTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    }
  },
  DELETE() {
    return {
      method: 'DELETE'
    }
  }
}

const request = async (url: URL | RequestInfo, option?: RequestInit) => {
  const res = await fetch(url, option)
  if (!res.ok) {
    alert('에러가 발생했습니다.')
  }

  return res.json()
}

const requestWithoutJson = async (url: URL | RequestInfo, option?: RequestInit) => {
  const res = await fetch(url, option)
  if (!res.ok) {
    alert('에러가 발생했습니다.')
  }

  return res
}

export type MenuByCategory = {
  id: string
  isSoldOut: boolean
  name: string
} 

interface IMenuApi {
  getAllMenuByCategory: (category: string) => Promise<MenuByCategory[]>
  createMenu: (category: string, name: string) => Promise<MenuByCategory>
  updateMenu: (category: string, name: string, menuId: string) => Promise<MenuByCategory>
  toggleSoldOutMenu: (category: string, menuId: string) => Promise<MenuByCategory>
  deleteMenu: (category: string, menuId: string) => Promise<Response>
}

const MenuApi: IMenuApi = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`)
  },
  async createMenu(category, name) {
    return request(`
      ${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name }),
    )
  },
  async updateMenu(category, name, menuId) {
    return request(`
      ${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name }),
    )
  },
  async toggleSoldOutMenu(category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT(),
    )
  },
  async deleteMenu(category, menuId) {
    return requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE(),
    )
  }
}

export default MenuApi
