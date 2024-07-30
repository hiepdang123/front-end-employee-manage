import { http } from "../http";

const REST_API_BASE_URL = "http://localhost:9000/api/";
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post(REST_API_BASE_URL + "files/upload", formData);
};

export const loadFile = (file) => {
  return http.post(`${REST_API_BASE_URL}files/upload/${file}`);
};
