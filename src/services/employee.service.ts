import axios from "axios";

const API = "http://localhost:8080/api/employees";

export const getEmployees = () => {
  return axios.get(API);
};

export const getEmployeeById = (id: string) => {
  return axios.get(`${API}/${id}`);
};

export const createEmployee = (data: any) => {
  return axios.post(API, data);
};

export const updateEmployee = (id: string, data: any) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteEmployee = (id: string) => {
  return axios.delete(`${API}/${id}`);
};