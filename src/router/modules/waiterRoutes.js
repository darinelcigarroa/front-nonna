export default [
  {
    path: 'create-order',
    name: 'create-order',
    component: () => import('src/pages/waiter/CreateOrderPage.vue'),
  },
  {
    path: 'active-tables',
    name: 'active-tables',
    component: () => import('src/pages/waiter/ActiveTablesPage.vue'),
  },
  {
    path: 'edit/:id',
    name: 'edit-order',
    component: () => import('src/pages/waiter/EditOrderPage.vue'),
  },
]
