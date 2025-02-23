// src/router/modules/waiterRoutes.js
export default [
  { path: 'create-order', component: () => import('src/pages/waiter/CreateOrderPage.vue') },
  { path: 'active-tables', component: () => import('src/pages/waiter/ActiveTablesPage.vue') },
]
