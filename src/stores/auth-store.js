import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'boot/axios'
import authService from 'src/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    roles: [],
    token: localStorage.getItem('auth_token') || null,
  }),
  getters: {
    fullName: (state) => state.user.name + ' ' + state.user.first_surname
  },
  actions: {
    /**
     * Log in and store user data
     */
    async login(email, password) {
      const result = await authService.login(email, password)

      if (result.success) {
        this.token = result.data.token
        this.user = result.data.user
        this.roles = result.data.roles

        localStorage.setItem('auth_token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }

      return result
    },

    /**
     * Fetch the authenticated user
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
     * Log out and clear state
     */
    async logout() {
      const result = await authService.logout()

      if (result.success) {
        this.token = ''
        this.user = null
        localStorage.removeItem('auth_token')
        delete api.defaults.headers.common['Authorization']
      }

      return result;
    },
    /**
     * Check specific roles
     */
    hasAnyRole(roles) {
      return roles.some(role => this.roles.includes(role))
    },
    /**
     * Verify if there is an active session
     */
    isAuthenticated() {
      return !!this.token
      // return Boolean(this.token) && this.token !== 'undefined' && this.token !== 'null'
    }
  },
  persist: true,
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

