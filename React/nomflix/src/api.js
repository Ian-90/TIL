import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "26403128335c2c217bfab9e6c08b88d9", 
    language: "en-US"
  }
})

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
}

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
}