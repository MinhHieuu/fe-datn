import axios from "@/utils/axios";

const BASE_URL = "/employees";

export const getEmployees = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getEmployeeById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createEmployee = async (data: any) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateEmployee = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};