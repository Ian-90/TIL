import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index'
import _ from 'lodash'

const INITIAL_STATE = {
  all: [],
  post: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    // section 9
    case DELETE_POST:
      return _.omit(state, action.payload)

    case FETCH_POST:
      // section6
      // return {
      //   ...state,
      //   post: action.payload.data
      // }

      // section 9
      // const post = action.payload.data
      // const newState = { ...state }
      // newState[post.id] = post
      // return newState

      return { ...state, [action.payload.data.id]: action.payload.data }
      
    case FETCH_POSTS:
      return {
        ...state,
        // section 6
        // all: action.payload.data,

        // section 9
        all: _.mapKeys(action.payload.data, 'id')
      }

    default:
      return state;
  }
}
