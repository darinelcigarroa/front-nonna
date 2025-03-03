import waiterRoutes from './modules/waiterRoutes'
import chefRoutes from './modules/chefRoutes'
import adminRoutes from './admin/adminRoutes'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...waiterRoutes,
      ...chefRoutes,
      ...adminRoutes,
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('src/components/MyProfile.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('pages/admin/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
