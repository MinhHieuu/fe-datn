import { axiosInstance } from './axios-instance'
import axios from "axios";
import type { ApiResponse, OrderRequest, OrderResponse, VNPayResponse, VoucherCheckResponse } from '@/types'

export const placeOrder = (body: OrderRequest) =>
  axiosInstance.post<ApiResponse<OrderResponse | VNPayResponse>>('/api/order/pay', body)

export const checkVoucher = (code: string, subTotal: number) =>
  axiosInstance.get<ApiResponse<VoucherCheckResponse>>('/api/order/check-voucher', {
    params: { code, subTotal },
  })


export const getCart = async (customerId: string) => {
  const res = await axios.get(`/api/order/${customerId}`);
  return res.data;
};
export const updateCart = async (id: string, quantity: number) => {
  return await axios.put(`/api/order/update`, {
    id,
    quantity,
  });
};

export const deleteCart = async (id: string) => {
  return await axios.delete(`/api/order/${id}`);
};

export const checkoutCart = async (customerId: string) => {
  return await axios.put(`/api/order/checkout/${customerId}`);
};