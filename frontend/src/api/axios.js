import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export default API;

export const getProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  return res.json();
};
