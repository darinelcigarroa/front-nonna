import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { echo } from 'src/boot/echo'
import { useRouter } from 'vue-router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { 'Accept': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')

  // Evita agregar el token en login/register
  const isAuthRoute = !['/login', '/register'].some(url => config.url?.includes(url))
  console.log('url', config.url)
  console.log('isAuthRoute', isAuthRoute)
  if (token && isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (echo && echo.socketId()) {
    config.headers['X-Socket-ID'] = echo.socketId()
  }

  return config
})

// Interceptor de respuestas (aquí limpias la sesión si hay error 401/419)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      localStorage.clear()

      // Redirige al login usando el router
      const router = useRouter()
      router.push({ name: 'login' }) // Asegúrate que la ruta tenga el name "login"
    }

    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
