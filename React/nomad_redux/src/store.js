import { createStore } from 'redux'
import { createAction, createReducer, configureStore, createSlice } from '@reduxjs/toolkit'

const ADD = 'ADD'
const DELETE = 'DELETE'

// redux code
// const addTodo = (text) => ({ type: ADD, text })
// const deleteTodo = (id) => ({ type: DELETE, id })

// const reducer = (state = [], action) => {
//   switch(action.type) {
//     case addTodo.type:
//       return [{ text: action.payload, id: Date.now() }, ...state]
//     case deleteTodo.type:
//       return state.filter(toDo => toDo.id !== action.payload)
//     default:
//       return state
//   }
// }
// const store = createStore(reducer)

// redux toolkit code
// const addTodo = createAction('ADD')
// const deleteTodo = createAction('DELETE')


// const reducer = createReducer([], {
//   [addTodo]: (state, action) => {
//     state.push({ text: action.payload, id: Date.now() })
//   },
//   [deleteTodo]: (state, action) => state.filter(toDo => toDo.id !== action.payload)
// })

const toDo = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ text: action.payload, id: Date.now() })
    },
    remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
  }
})
const store = configureStore({ reducer: toDo.reducer })

// export const actionCreators = {
//   addTodo,
//   deleteTodo,
// }

export const {
  add, remove
} = toDo.actions

export default store