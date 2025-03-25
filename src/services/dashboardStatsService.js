import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get('dashboard/stats')
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error en login'
            }
        }
    },
}
