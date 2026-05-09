import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000", // o tu URL del backend
})

// ⭐ INTERCEPTOR: agrega el token a TODAS las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
