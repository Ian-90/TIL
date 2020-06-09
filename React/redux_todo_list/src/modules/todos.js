import { Map, List } from 'immutable'
import { handleActions, createAction } from 'redux-actions'

const INSERT = 'todos/INSERT'
const TOGGLE = 'todos/TOGGLE'
const REMOVE = 'todos/REMOVE'

export const insert = createAction(INSERT)
export const toggle = createAction(TOGGLE)
export const remove = createAction(REMOVE)

const initialState = List([
  Map({
    id: 0,
    text: 'react study',
    done: true
  }),
  Map({
    id: 1,
    text: 'component styling todo',
    done: false
  })
])

export default handleActions({
  [INSERT]: (state, action) => {
    const { id, text, done } = action.payload
    return state.push(Map({
      id,
      text,
      done
    }))
  },

  [TOGGLE]: (state, action) => {
    const { payload: id } = action
    return state.updateIn([id, 'done'], done => !done)
  },

  [REMOVE]: (state, action) => {
    const { payload: id } = action
    return state.delete(id)
  }
}, initialState)
