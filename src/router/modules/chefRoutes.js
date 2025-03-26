export default [
  {
    path: 'kitchen-orders',
    name: 'kitchen-orders',
    component: () => import('@/pages/chef/KitchenOrders.vue'),
    meta: { requiresAuth: true, roles: ['chef'] }
  },
  {
    path: 'desactivate-dishes',
    name: 'desactivate-dishes',
    component: () => import('@/pages/chef/DesactivateDishesPage.vue'),
    meta: { requiresAuth: true, roles: ['chef'] }
  },
]
