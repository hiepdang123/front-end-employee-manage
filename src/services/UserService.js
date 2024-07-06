import { http } from "../http";

const REST_API_BASE_URL = "http://localhost:9000/api";
export const loginApiCall = (user) => {
  return http.post(REST_API_BASE_URL + "/login", user);
};

export const logoutApiCall = () => {
  return http.post(REST_API_BASE_URL + "/logout");
};
