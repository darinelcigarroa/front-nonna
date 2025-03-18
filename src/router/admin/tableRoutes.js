export default [
    {
        path: '/index/table',
        name: 'indexTable',
        component: () => import('src/pages/admin/table/IndexPage.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
        path: '/create/table',
        name: 'createTable',
        component: () => import('src/components/admin/table/CreateTableDialog.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
    {
        path: '/data/tables',
        name: 'dataTables',
        component: () => import('src/components/admin/table/DataTable.vue'),
        meta: { requiresAuth: true, roles: ['super-admin'] }
    },
]
