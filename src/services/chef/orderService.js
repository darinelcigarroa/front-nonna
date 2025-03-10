import { api } from 'boot/axios'


export default {
    async index(params) {
        try {
            const response = await api.get('chef/orders', { params })
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al obtener las órdenes'
            }
        }
    },
}
