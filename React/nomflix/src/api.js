import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "26403128335c2c217bfab9e6c08b88d9", 
    language: "en-US"
  }
})

api.get("tv/popular");

export default api;