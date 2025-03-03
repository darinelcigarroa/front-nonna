import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuthStore } from 'stores/auth-store' // Import authentication store
import routes from './routes'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 🔹 **Global Route Guard: Protect Routes Based on Authentication and Multiple Roles**
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated()

    // 🔹 Redirect to login if not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next('/login')
    }

    // 🔹 Prevent authenticated users from accessing the login page
    if (to.path === '/login' && isAuthenticated) {
      return next('/')
    }

    // 🔹 Check if the user has any of the required roles
    if (to.meta.roles?.length && !authStore.hasAnyRole(to.meta.roles)) {
      return next('/403')
    }

    next()
  })

  return Router
})
