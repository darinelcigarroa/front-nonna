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
   * Obtener el usuario autenticado
   */
  async getUser() {
    try {
      const response = await api.get('/me')
      return { success: true, user: response.data }
    } catch (error) {
      console.error('Error obteniendo usuario:', error)
      return { success: false, message: 'No autenticado' }
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await api.post('/logout')

      // Remover el token de localStorage y Axios
      localStorage.removeItem(AUTH_TOKEN_KEY)
      delete api.defaults.headers.common['Authorization']

      return { success: true }
    } catch (error) {
      console.error('Error en logout:', error)
      return { success: false, message: 'No se pudo cerrar sesión' }
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
