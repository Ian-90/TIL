import { combineReducers } from "redux";
// section 4
// import BooksReducer from "./reducer_book";
// import ActiveBook from "./reducer_active_book";

// section 5
// import WeatherReducer from "./reducer_weather";

// section 6
import PostsReducer from "./reducer_posts"
import { reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  // books: BooksReducer,
  // activeBook: ActiveBook,
  // weather: WeatherReducer,
  posts: PostsReducer,
  form: formReducer,
});

export default rootReducer;
