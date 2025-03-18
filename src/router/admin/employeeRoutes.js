export default [
    {
        path: '/index/employee',
        name: 'indexEmployee',
        component: () => import('src/pages/admin/employee/IndexPage.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
        path: '/create/employee',
        name: 'createEmployee',
        component: () => import('src/components/admin/employee/CreateEmployeeDialog.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
        path: '/admin/profile',
        name: 'myProfile',
        component: () => import('@/components/MyProfile.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
]
