import { createStore } from 'redux'

const ADD = 'ADD'
const DELETE = 'DELETE'

const addTodo = (text) => ({ type: ADD, text })
const deleteTodo = (id) => ({ type: DELETE, id })

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state]
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

export const actionCreators = {
  addTodo,
  deleteTodo,
}

export default store