import { v4 as uuidv4 } from 'uuid'
import { ADD, DEL, COMPLETE, UNCOMPLETE, EDIT } from './actions'

export const initialState = {
  toDos: [],
  completed: [],

}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
          ...state,
          toDos: [...state.toDos, { text: action.payload, id: uuidv4() }]
      }

    case DEL:
      return {
        ...state,
        toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
        completed: state.completed.filter((toDo) => toDo.id !== action.payload),
      }

    case COMPLETE:
      const target = state.toDos.find((toDo) => toDo.id === action.payload)
      return {
        ...state,
        toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
        completed: [...state.completed, { ...target }]
      }

    case UNCOMPLETE:
      const aTarget = state.completed.find((toDo) => toDo.id === action.payload)
      return {
        ...state,
        toDos: [...state.toDos, { ...aTarget }],
        completed: state.completed.filter((toDo) => toDo.id !== action.payload),
      }
    
    case EDIT:
      const eTargetIdx = state.toDos.findIndex((todo) => todo.id === action.payload.id)
      return {
        ...state,
        toDos: [...state.toDos.slice(0, eTargetIdx), action.payload, ...state.toDos.slice(eTargetIdx + 1)]
      }

    default:
      return state
  }
}

export default reducer
