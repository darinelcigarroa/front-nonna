export default [
  {
    path: 'index',
    name: 'index-order',
    component: () => import('@/pages/admin/order/IndexPage.vue'),
    meta: { requiresAuth: true, roles: ['super-admin'] }
  },
  {
    path: 'create-order',
    name: 'create-order',
    component: () => import('@/pages/waiter/CreateOrderPage.vue'),
    meta: { requiresAuth: true, roles: ['waiter'] }
  },
  {
    path: 'active-tables',
    name: 'active-tables',
    component: () => import('@/pages/waiter/ActiveTablesPage.vue'),
    meta: { requiresAuth: true, roles: ['waiter'] }
  },
  {
    path: 'edit/:id',
    name: 'edit-order',
    component: () => import('@/pages/waiter/EditOrderPage.vue'),
    meta: { requiresAuth: true, roles: ['waiter'] }
  },
]
