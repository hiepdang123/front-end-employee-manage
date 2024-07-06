import axios from "axios";

const token = localStorage.getItem("token");

export const http = axios.create({
  baseURL: "http://localhost:9000/api/",
  headers: { Authorization: token },
});
