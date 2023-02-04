import axios from "axios";

export const getAuthorizationHeader = () =>
  `${
    window.localStorage.getItem("token") &&
    JSON.parse(window.localStorage.getItem("token"))
  }`;

export const client = axios.create({
  baseURL: "http://localhost:7000",
  // baseURL: "https://boginooapi.onrender.com",
  headers: {
    "Content-Type": "application/json",
    authorization: getAuthorizationHeader(),
  },
});
