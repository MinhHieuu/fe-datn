import { axiosInstance } from './axios-instance'
import axios from "axios";
import dayjs from "dayjs";
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


const API = "http://localhost:8080/api/orders";

export const getOrders = () => axios.get(API);

export const filterOrders = (params: any) =>
  axios.get(`${API}/filter`, { params });

export const getRevenue = (params: any) =>
  axios.get(`${API}/revenue`, { params });

export const getBestSelling = (params: any) =>
  axios.get(`${API}/best-selling`, { params });

export const getTotalOrders = (params: any) =>
  axios.get(`${API}/total`, { params });

export const getOrderById = (id: string) =>
  axios.get(`${API}/${id}`);

export const updateOrderStatus = (id: string, status: number) =>
  axios.put(`${API}/${id}/status`, { status });     

export const cancelOrder = (id: string) =>
  axios.put(`${API}/${id}/cancel`);

export const validateOrderFilter = (filters: any) => {
  if (filters.fromDate && filters.toDate) {
    if (dayjs(filters.fromDate).isAfter(dayjs(filters.toDate))) {
      return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
    }
  }
  return null;
};

export const validateOrderDetail = (order: any) => {
  if (!order) return "Không tìm thấy hóa đơn";

  if (!order.items || order.items.length === 0) {
    return "Hóa đơn không có sản phẩm";
  }

  for (let item of order.items) {
    if (item.quantity <= 0) {
      return "Số lượng sản phẩm phải > 0";
    }
    if (item.price <= 0) {
      return "Giá sản phẩm không hợp lệ";
    }
  }

  return null;
};