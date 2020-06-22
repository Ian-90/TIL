import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'

const INITIALIZE = 'editor/INITIALIZE'
const CHANGE_INPUT = 'editor/CHANGE_INPUT'

export const initailize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)

const initiaState = Map({
  title: '',
  markdown: '',
  tags: '',
})

export default handleActions({
  [INITIALIZE]: (state, action) => initiaState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload
    return state.set(name, value)
  }
}, initiaState)
