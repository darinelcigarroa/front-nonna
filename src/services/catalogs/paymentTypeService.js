import { api } from 'boot/axios'


export default {
    async index(pagination) {
        try {
            const response = await api.get('catalogs/payment-types', {
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
            const response = await api.post('catalogs/payment-types', payload)
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
            const response = await api.patch(`catalogs/payment-types/${payload.id}`, payload)
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
            const response = await api.delete(`catalogs/payment-types/${id}`)

            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async getPaymentTypes() {
        try {
            const response = await api.get('catalogs/get-payment-types')
            return response.data

        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
