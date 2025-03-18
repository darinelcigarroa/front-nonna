export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('src/pages/admin/DashboardPage.vue'),
    meta: { requiresAuth: true, roles: ['super-admin'] }
  },
  {
    path: '/admin/profile',
    name: 'myProfile',
    component: () => import('@/components/MyProfile.vue'),
    meta: { requiresAuth: true, roles: ['super-admin'] }
  },
]
