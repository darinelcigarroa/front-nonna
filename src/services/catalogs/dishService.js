import { api } from 'boot/axios'


export default {
    async index(pagination) {
        try {
            const response = await api.get('catalogs/dish', {
                params: {
                    rowsPerPage: pagination.rowsPerPage,
                    page: pagination.page,
                    filter: pagination.filter
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
            const response = await api.post('catalogs/dish', payload)
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
            const response = await api.patch(`catalogs/dish/${payload.id}`, payload)
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
            const response = await api.delete(`catalogs/dish/${id}`)

            return response.data
        } catch (error) {
            return error.response?.data || {
                sucsses: false,
                message: 'Error al obtener la orden'
            }
        }
    },
    async getDishes(params) {
        try {
            const response = await api.get('catalogs/get-dishes', { params })
            return response.data

        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
