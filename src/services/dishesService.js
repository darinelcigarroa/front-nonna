import { api } from 'boot/axios'


export default {
    async index(params) {
        try {
            const response = await api.get('waiter/dishes', { params })
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
