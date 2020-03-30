// section 4
// export function selectBook(book) {
//   return {
//     type: "BOOK_SELECTED",
//     payload: book
//   };
// }

// section 5
// import axios from "axios";
// import Weather from "../../API_KEY";

// const API_KEY = Weather.API_KEY;
// const ROOT_URL = `https://api.openweathermap.org//data/2.5/forecast?appid=${API_KEY}`;
// export const FETCH_WEATHER = "FETCH_WEATHER";

// export function fetchWeather(city) {
//   const url = `${ROOT_URL}&q=${city},us`;
//   const request = axios.get(url);
//   return {
//     type: FETCH_WEATHER,
//     payload: request
//   };
// }

// section6
import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS"
export const CREATE_POST = "CREATE_POST"
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'

const ROOT_URL=`http://reduxblog.herokuapp.com/api`
const API_KEY = `?key=testreactapiposts`

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props)

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)

  return {
    type: DELETE_POST,
    payload: request
  }
}