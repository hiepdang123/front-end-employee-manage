import { http } from "../http";

const REST_API_BASE_URL = "http://localhost:9000/api/employees/";

export const listEmployees = () => {
  return http.get(REST_API_BASE_URL);
};

export const createEmployee = (employee) => {
  return http.post(REST_API_BASE_URL, employee);
};

export const getEmployee = (employeeId) => {
  return http.get(REST_API_BASE_URL + employeeId);
};

export const updateEmployee = (employee) => {
  return http.put(REST_API_BASE_URL, employee);
};

export const deleteEmployee = (employeeId) => {
  return http.delete(REST_API_BASE_URL + employeeId);
};

export const uploadImgEmployee = (employeeId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post(`${REST_API_BASE_URL}upload/${employeeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
