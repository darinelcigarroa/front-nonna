import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { echo } from 'src/boot/echo'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  headers: { 'Accept': 'application/json' }
})


api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (echo && echo.socketId()) {
    config.headers['X-Socket-ID'] = echo.socketId()
  }

  return config
})

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
