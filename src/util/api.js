import axios from "axios"

const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/' })

const api = {
  getProducts: () => {
    return axiosInstance.get('products')
  },
  getProduct: (id) => {
    return axiosInstance.get(`product/${id}`)
  },
  addToCart: (id, data) => {
    return axiosInstance.post(`addToCart/${id}`, data)
  },
  getCart: () => {
    return axiosInstance.get(`cart`)
  },
  updateCart: (id) => {
    return axiosInstance.post(`updateCart/${id}`)
  }
}

window.api = api
export default api
