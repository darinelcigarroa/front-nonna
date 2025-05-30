import { api } from 'boot/axios'


export default {
    async index() {
        try {
            const response = await api.get('catalogs/positions')
            return response.data
        } catch (error) {
            return error.response?.data || {
                success: false,
                message: 'Error al obtener las posiciones'
            }
        }
    },
}
