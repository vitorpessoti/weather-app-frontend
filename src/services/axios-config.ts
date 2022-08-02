import axios from "axios";


export const api = axios.create({
  baseURL: "https://weather-app-v1-backend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});


