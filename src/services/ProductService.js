import { http } from "../http";

const REST_API_BASE_URL = "http://localhost:9000/api/products/";

export const listProducts = () => {
  return http.get(REST_API_BASE_URL);
};

export const listProductsByIds = (ids) => {
  return http.get(REST_API_BASE_URL + `ids?ids=${ids.join(",")}`);
};

export const createProduct = (product) => {
  return http.post(REST_API_BASE_URL, product);
};

export const getProduct = (productId) => {
  return http.get(REST_API_BASE_URL + productId);
};

export const updateProduct = (product) => {
  return http.put(REST_API_BASE_URL + product.id, product);
};

export const deleteProduct = (productId) => {
  return http.delete(REST_API_BASE_URL + productId);
};

export const uploadImgProduct = (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post(`${REST_API_BASE_URL}upload/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
