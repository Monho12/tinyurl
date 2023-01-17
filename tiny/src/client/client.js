import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
    authorization:
      window.localStorage.getItem("token") &&
      JSON.parse(window.localStorage.getItem("token")),
  },
});
