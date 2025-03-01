export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('src/pages/admin/DashboardPage.vue'),
  },
  {
    path: '/create/employee',
    name: 'createEmployee',
    component: () => import('src/pages/admin/CreateEmployeePage.vue'),
  },
  {
    path: '/admin/tables',
    name: 'createTables',
    component: () => import('src/pages/admin/CreateTablesPage.vue'),
  },
  {
    path: '/admin/dishes',
    name: 'createDishes',
    component: () => import('src/pages/admin/CreateDishesPage.vue'),
  },
  {
    path: '/admin/profile',
    name: 'createEmployee',
    component: () => import('src/pages/admin/CreateEmployeePage.vue'),
  },
]
