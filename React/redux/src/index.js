import { createStore } from 'redux'

const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

const ADD = 'ADD'
const DELETE = 'DELETE_TODO'

const addTodo = (text) => {
    type: ADD,
    text
}

const deleteTodo = id => {
  type: DELETE,
  id
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      return [ ...state, { text: action.text, id: Date.now() } ]
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text))
}

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.targe.parentNode.id)
  store.dispatch(deleteTodo(id))
}

const paintTodos = () => {
  const toDos = store.getState()
  ul.innerText = ""
  toDos.forEach(toDo => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.innerText = "DEL"
    btn.addEventListener('click', dispatchDeleteTodo)
    li.id = toDo.id
    li.innerText = toDo.text
    li.appendChild(btn)
    ul.appendChild(li)
  })
}

store.subscribe(paintTodos)

const onSubmit = e => {
  e.preventDefault()
  const toDo = input.value
  input.value = ""
  dispatchAddTodo(toDo)
}

form.addEventListener('submit', onSubmit)