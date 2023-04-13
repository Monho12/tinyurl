import axios from "axios";

export const getAuthorizationHeader = () =>
  `${
    window.localStorage.getItem("token") &&
    JSON.parse(window.localStorage.getItem("token"))
  }`;

export const client = axios.create({
  baseURL: "https://api-8ryb.onrender.com",
  headers: {
    "Content-Type": "application/json",
    authorization: getAuthorizationHeader(),
  },
});
