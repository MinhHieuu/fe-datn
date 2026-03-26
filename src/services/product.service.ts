import axios from "axios";


export const getProducts = (params?: any) =>
  axios.get(API, { params });

export const getProductById = (id: string) =>
  axios.get(`${API}/${id}`);

export const createProduct = (data: any) =>
  axios.post(API, data);

export const updateProduct = (id: string, data: any) =>
  axios.put(`${API}/${id}`, data);

export const deleteProduct = (id: string) =>
  axios.delete(`${API}/${id}`);


export const filterProducts = (params: {
  keyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: number;
}) =>
  axios.get(`${API}/filter`, { params });


export const getBestSellingProducts = (params?: {
  fromDate?: string;
  toDate?: string;
}) =>
  axios.get(`${API}/best-seller`, { params });


export const getProductVariants = (productId: string) =>
  axios.get(`${API}/${productId}/variants`);



export const uploadProductImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const API = "http://localhost:8080/api/products";