// export function selectBook(book) {
//   return {
//     type: "BOOK_SELECTED",
//     payload: book
//   };
// }
import axios from "axios";
import Weather from "../../API_KEY";

const API_KEY = Weather.API_KEY;
const ROOT_URL = `https://api.openweathermap.org//data/2.5/forecast?appid=${API_KEY}`;
export const FETCH_WEATHER = "FETCH_WEATHER";

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
