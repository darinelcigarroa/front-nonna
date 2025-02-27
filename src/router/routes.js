import waiterRoutes from './modules/waiterRoutes'
import chefRoutes from './modules/chefRoutes'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...waiterRoutes,
      ...chefRoutes,
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/profile', name: 'profile', component: () => import('pages/MyProfile.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
