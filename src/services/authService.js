import { api } from 'boot/axios'

const AUTH_TOKEN_KEY = 'auth_token'

export default {
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password })
      return response.data
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Error en login'
      }
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      const response = await api.post('/logout')

      return response.data

    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Error en login'
      }
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  },

  /**
   * Obtener el token almacenado
   */
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  /**
   * Establecer el token en Axios después de una recarga de página
   */
  setTokenOnStartup() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}
