import waiterRoutes from './orderRoutes'
import chefRoutes from './modules/chefRoutes'
import adminRoutes from './admin/adminRoutes'
import tableRoutes from './admin/tableRoutes'
import employeeRoutes from './admin/employeeRoutes'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...waiterRoutes,
      ...chefRoutes,
      ...adminRoutes,
      ...employeeRoutes,
      ...tableRoutes,
      {
        path: '', name: 'home', component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('src/components/MyProfile.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/403',
    component: () => import('pages/Error403Page.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/Error404Page.vue'),
  },
]

export default routes
