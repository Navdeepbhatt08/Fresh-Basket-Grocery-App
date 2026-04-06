import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export default API

export const getProducts = async () => {
  const res = await fetch("http://localhost:5000/api/products")
  return res.json()
}