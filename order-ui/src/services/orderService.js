import axios from "axios";

const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/orders";
const BASE_URL = rawUrl.endsWith("/api/orders") ? rawUrl : (rawUrl.endsWith("/") ? `${rawUrl}api/orders` : `${rawUrl}/api/orders`);

export const createOrder = (orderData) => {
  return axios.post(BASE_URL, orderData);
};

export const getOrderById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const getAllOrders = () => {
  return axios.get(BASE_URL);
};

export const approvePendingPayment = (id) => {
  return axios.put(`${BASE_URL}/${id}/approve`);
};