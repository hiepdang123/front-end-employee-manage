import { http } from "../http";

const REST_API_BASE_URL = "http://localhost:9000/api/orders/";

export const listOrders = () => {
  return http.get(REST_API_BASE_URL);
};

export const listOrdersByIds = (ids) => {
  return http.get(REST_API_BASE_URL + `ids?ids=${ids.join(",")}`);
};

export const createOrder = (order) => {
  return http.post(REST_API_BASE_URL, order);
};

export const getOrder = (orderId) => {
  return http.get(REST_API_BASE_URL + orderId);
};

export const updateOrder = (order) => {
  return http.put(REST_API_BASE_URL + order.id, order);
};

export const deleteOrder = (orderId) => {
  return http.delete(REST_API_BASE_URL + orderId);
};
