import { configureStore, combineReducers, ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import todo from './todo'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux'

const rootReducer = combineReducers({
  todo: todo.reducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    return nextState
  }
  return rootReducer(state, action)
}

const initStore = () => configureStore({
  reducer,
  devTools: true,
})

export type AppStore = ReturnType<typeof initStore>
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppState>(initStore, { debug: true })
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector
