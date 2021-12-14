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
  updateCart: (id,data) => {
    return axiosInstance.post(`updateCart/${id}`,data)
  },
  emptyCart: () => {
    return axiosInstance.get(`emptyCart `)
  },
  checkoutCart: () => {
    return axiosInstance.get(`checkout`)
  },
  login: (email,password) => {
    return axiosInstance.post(`login`,{email:email,password:password})
  }

}

window.api = api
export default api
