import { api } from 'boot/axios'


export default {
    async index(pagination, filterPosition) {
        try {
            const response = await api.get('admin/employee', {
                params: {
                    rowsPerPage: pagination.rowsPerPage,
                    page: pagination.page,
                    filter: pagination.filter,
                    filterPosition: filterPosition
                }
            })
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al obtener los empleados'
            }
        }
    },
    async store(payload) {
        try {
            const response = await api.post('admin/employee', payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al registrar al empleado'
            }
        }
    },
    async update(payload) {
        try {
            const response = await api.patch(`admin/employee/${payload.id}`, payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async delete(id) {
        try {
            const response = await api.delete(`admin/employee/${id}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async exportEmployeesExcel(params) {
        try {
            const response = await api.get('admin/export/employee/excel', {
                params,
                responseType: 'blob'
            });

            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    }
}
