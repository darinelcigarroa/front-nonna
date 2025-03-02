import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import authService from 'src/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null
  }),

  actions: {
    /**
     * Iniciar sesión y guardar datos del usuario
     */
    async login(email, password) {
      const result = await authService.login(email, password)

      if (result.success) {
        this.token = result.data.token
        this.user = result.data.user
    
        localStorage.setItem('auth_token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    
      return result
    },       
    /**
     * Obtener el usuario autenticado
     */
    async fetchUser() {
      if (!this.token) return

      const result = await authService.getUser()

      if (result.success) {
        this.user = result.user
      } else {
        this.logout()
      }
    },

    /**
     * Cerrar sesión y limpiar estado
     */
    async logout() {
      await authService.logout()
      this.token = ''
      this.user = null
      localStorage.removeItem('auth_token')
      delete api.defaults.headers.common['Authorization']
    },

    /**
     * Verificar si hay sesión activa
     */
    isAuthenticated() {
      console.log('Valor de token:', this.token)
      return Boolean(this.token) && this.token !== 'undefined' && this.token !== 'null'
    }
  }
})
