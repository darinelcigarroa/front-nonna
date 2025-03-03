export default [
  {
    path: 'kitchen-orders',
    name: 'kitchen-orders',
    component: () => import('@/pages/chef/KitchenOrders.vue'),
    meta: { requiresAuth: true, roles: ['chef'] }
  },
]
