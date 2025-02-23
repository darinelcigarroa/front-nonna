export default [
  {
    path: 'create-order',
    name: 'crear-orden',
    component: () => import('src/pages/waiter/CreateOrderPage.vue'),
  },
  {
    path: 'active-tables',
    name: 'tablas-activas',
    component: () => import('src/pages/waiter/ActiveTablesPage.vue'),
  },
  {
    path: 'edit/:id',
    name: 'editar-orden',
    component: () => import('src/pages/waiter/EditOrderPage.vue'),
  },
]
