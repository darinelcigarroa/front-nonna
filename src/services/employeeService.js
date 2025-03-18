import { api } from 'boot/axios'


export default {
    async index(pagination) {
        try {
            const response = await api.get('admin/employee', {
                params: {
                    rowsPerPage: pagination.rowsPerPage,
                    page: pagination.page
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
            console.log(payload)
            const response = await api.patch(`admin/employee/${payload.id}`, payload)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async delete(orderItemID) {
        try {
            const response = await api.delete(`order-item/${orderItemID}`)
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async updateDishStatus(orderItems, status_id) {
        try {
            const response = await api.patch('order-items/update-dish-status', { orderItems, status_id });
            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },

}
